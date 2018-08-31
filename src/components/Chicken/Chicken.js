/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Alert } from 'react-native';
import ChickenRenderer from './ChickenRenderer';
import chickenSelector from '../../selectors/chickenSelector';
import chickenStatsSelector from '../../selectors/chickenStatsSelector';
import { actionTypes } from '../../redux/constants';
import {
  type Chicken as ChickenType,
  type Navigation,
  type ChickenStats,
} from '../../types';

type Props = {
  navigation: Navigation,
  chicken: ChickenType,
  stats: ChickenStats,
  chickenId: string,
  prevChickenId: string,
  nextChickenId: string,
  flockId: string,
  deleteChicken: (flockId: string, chickenId: string, paths: string[]) => void,
};

type State = {
  showModal: boolean,
};

class Chicken extends React.Component<Props, State> {
  state = {
    showModal: false,
  };

  shouldComponentUpdate(newProps) {
    const { chicken, navigation } = newProps;
    if (!chicken) {
      navigation.goBack();
      return false;
    }
    return true;
  }

  toggleModal = (visible) => {
    this.setState({ showModal: visible });
  };

  handleDeleteChicken = (chickenId) => {
    const { flockId, deleteChicken, chicken } = this.props;

    const paths = [];
    if (chicken.photoPath && chicken.photoPath !== '') {
      paths.push(chicken.photoPath);
    }
    if (chicken.thumbnailPath && chicken.thumbnailPath !== '') {
      paths.push(chicken.thumbnailPath);
    }

    Alert.alert(
      'Are you sure?',
      `This will delete ${chicken.name} and all her eggs.`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteChicken(flockId, chickenId, paths),
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

    const { showModal } = this.state;

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
        showModal={showModal}
        toggleModal={this.toggleModal}
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
  deleteChicken: (flockId, chickenId, paths) => dispatch({
    type: actionTypes.DELETE_CHICKEN_REQUESTED,
    payload: { flockId, chickenId, paths },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(Chicken);
