/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionSheet, Text } from 'native-base';
import { Alert } from 'react-native';
import Loading from '../Loading';
import ChickenRenderer from './ChickenRenderer';
import chickenSelector from '../../selectors/chickenSelector';
import chickenStatsSelector from '../../selectors/chickenStatsSelector';
import flockStatsSelector from '../../selectors/flockStatsSelector';
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
  deleteChicken: (chickenId: string, paths: string[]) => void,
  inProgress: boolean,
  error: string,
  topProducer: boolean,
  heaviest: boolean,
};

type State = {
  showModal: boolean,
};

class Chicken extends React.Component<Props, State> {
  state = {
    showModal: false,
  };

  toggleModal = (visible) => {
    this.setState({ showModal: visible });
  };

  handleMoreOptions = () => {
    const { navigation, chickenId } = this.props;
    const BUTTONS = ['Edit Chicken', 'Delete Chicken', 'Cancel'];
    const ACTIONS = [
      () => navigation.navigate('ChickenEditor', { chickenId }),
      () => this.deleteChicken(chickenId),
      () => {},
    ];
    const DESTRUCTIVE_INDEX = 1;
    const CANCEL_INDEX = 2;
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Additonal Actions',
      },
      (buttonIndex) => {
        // console.log(BUTTONS[buttonIndex]);
        ACTIONS[buttonIndex]();
      },
    );
  };

  deleteChicken = (chickenId) => {
    const { deleteChicken, chicken } = this.props;

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
          onPress: () => deleteChicken(chickenId, paths),
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
      inProgress,
      error,
      topProducer,
      heaviest,
    } = this.props;

    const { showModal } = this.state;

    if (inProgress) {
      return <Loading message="Deleting Chicken..." />;
    }

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
        showModal={showModal}
        toggleModal={this.toggleModal}
        handleMoreOptions={this.handleMoreOptions}
        error={error}
        topProducer={topProducer}
        heaviest={heaviest}
      />
    );
  }
}

const mapStateToProps = (
  { chickens, eggs, deleteChicken: { inProgress, error } },
  { navigation },
) => {
  const chickenId = navigation.getParam('chickenId', 'NO-ID');
  const flockStats = flockStatsSelector(eggs.data);
  const topProducer = flockStats.mostEggs === chickenId;
  const heaviest = flockStats.heaviest && flockStats.heaviest.chickenId === chickenId;
  return {
    ...chickenSelector(chickens.data, chickenId),
    stats: chickenStatsSelector(eggs.data, chickenId),
    inProgress,
    error,
    topProducer,
    heaviest,
  };
};

const mapDispatchtoProps = dispatch => ({
  deleteChicken: (chickenId, paths) => dispatch({
    type: actionTypes.DELETE_CHICKEN_REQUESTED,
    payload: { chickenId, paths },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(Chicken);
