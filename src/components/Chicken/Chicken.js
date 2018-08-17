import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Alert } from 'react-native';
import ChickenRenderer from './ChickenRenderer';
import chickenSelector from '../../selectors/chickenSelector';
import chickenStatsSelector from '../../selectors/chickenStatsSelector';
import { firebaseRemoveRequested } from '../../redux/actions';
import { metaTypes } from '../../redux/constants';
import { Chicken as ChickenType, Navigation, ChickenStats } from '../../types';

type Props = {
  navigation: Navigation,
  chicken: ChickenType,
  stats: ChickenStats,
  chickenId: string,
  prevChickenId: string,
  nextChickenId: string,
  flockId: string,
  deleteChicken: (flockId: string, chickenId: string) => void,
};

class Chicken extends React.Component<Props> {
  shouldComponentUpdate(newProps) {
    const { chicken, navigation } = newProps;
    if (!chicken) {
      navigation.goBack();
      return false;
    }
    return true;
  }

  handleDeleteChicken = (chickenId) => {
    const { flockId, deleteChicken, chicken } = this.props;
    Alert.alert(
      'Are you sure?',
      `This will delete ${chicken.name} and all her eggs.`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteChicken(flockId, chickenId),
          style: 'destructive',
        },
      ],
    );
  };

  render() {
    const {
      chicken,
      chickenId,
      prevChickenId,
      nextChickenId,
      stats,
      navigation,
    } = this.props;

    if (chickenId === 'NO-ID') {
      return <Text>No Chicken ID passed in!</Text>;
    }

    if (!chicken) {
      return <Text>{`Chicken with ID ${chickenId} not found`}</Text>;
    }

    return (
      <ChickenRenderer
        navigation={navigation}
        chicken={chicken}
        chickenId={chickenId}
        stats={stats}
        prevChickenId={prevChickenId}
        nextChickenId={nextChickenId}
        handleDeleteChicken={this.handleDeleteChicken}
      />
    );
  }
}

const mapStateToProps = ({ chickens, eggs, userSettings }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', 'NO-ID');
  return {
    ...chickenSelector(chickens.data, chickenId),
    stats: chickenStatsSelector(eggs.data, chickenId),
    flockId: userSettings.data.currentFlockId,
  };
};

const mapDispatchtoProps = dispatch => ({
  deleteChicken: (flockId, chickenId) => dispatch(
    firebaseRemoveRequested({ flockId, chickenId }, metaTypes.chickens),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(Chicken);
