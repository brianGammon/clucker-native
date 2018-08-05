/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockRenderer from './FlockRenderer';
import {
  type Chicken,
  type Navigation,
  type Flock as FlockType,
} from '../../types';
import { firebaseRemoveRequested } from '../../redux/actions';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import isFlockOwnerSelector from '../../selectors/isFlockOwnerSelector';
import { metaTypes } from '../../redux/constants';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  flockId: string,
  flock: FlockType,
  isFlockOwner: boolean,
  deleteChicken: (flockId: string, chickenId: string) => void,
};

class Flock extends React.Component<Props> {
  constructor() {
    super();

    this.onDeleteChicken = this.onDeleteChicken.bind(this);
  }

  onDeleteChicken = (chickenId) => {
    const { flockId, deleteChicken } = this.props;
    deleteChicken(flockId, chickenId);
  };

  render() {
    const {
      navigation, chickens, flock, isFlockOwner,
    } = this.props;
    return (
      <FlockRenderer
        navigation={navigation}
        chickens={chickens}
        flock={flock}
        isFlockOwner={isFlockOwner}
        onDeleteChicken={this.onDeleteChicken}
      />
    );
  }
}

const mapStateToProps = ({ chickens, flocks, userSettings }) => ({
  chickens: chickens.data,
  flockId: userSettings.data.currentFlockId,
  flock: currentFlockSelector(flocks.data, userSettings),
  isFlockOwner: isFlockOwnerSelector(flocks.data, userSettings),
});

const mapDispatchtoProps = dispatch => ({
  deleteChicken: (flockId, chickenId) => dispatch(
    firebaseRemoveRequested({ flockId, chickenId }, metaTypes.chickens),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(Flock);
