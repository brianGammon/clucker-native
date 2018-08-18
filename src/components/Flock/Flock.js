/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockRenderer from './FlockRenderer';
import {
  type Chicken,
  type Navigation,
  type Flock as FlockType,
} from '../../types';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import isFlockOwnerSelector from '../../selectors/isFlockOwnerSelector';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  flock: FlockType,
  isFlockOwner: boolean,
};

class Flock extends React.Component<Props> {
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
      />
    );
  }
}

const mapStateToProps = ({
  chickens,
  flocks,
  userSettings,
  auth: { user },
}) => {
  const flockId = userSettings.data.currentFlockId;
  let flock = {};
  let isFlockOwner = false;
  if (flockId) {
    flock = currentFlockSelector(flocks.data, userSettings);
    isFlockOwner = isFlockOwnerSelector(flocks.data, userSettings, user.uid);
  }
  return {
    chickens: chickens.data,
    flockId,
    flock,
    isFlockOwner,
  };
};

export default connect(mapStateToProps)(Flock);
