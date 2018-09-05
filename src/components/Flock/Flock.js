/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockRenderer from './FlockRenderer';
import {
  type Chicken,
  type Navigation,
  type Flock as FlockType,
  type FlockStats,
} from '../../types';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import isFlockOwnerSelector from '../../selectors/isFlockOwnerSelector';
import flockStatsSelector from '../../selectors/flockStatsSelector';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  flock: FlockType,
  isFlockOwner: boolean,
  stats: FlockStats,
};

class Flock extends React.Component<Props> {
  render() {
    const {
      navigation, chickens, flock, isFlockOwner, stats,
    } = this.props;
    return (
      <FlockRenderer
        navigation={navigation}
        chickens={chickens}
        flock={flock}
        isFlockOwner={isFlockOwner}
        topProducer={stats && stats.mostEggs}
      />
    );
  }
}

const mapStateToProps = ({
  chickens,
  flocks,
  userSettings,
  eggs,
  auth: { user },
}) => {
  const flockId = userSettings.data.currentFlockId;
  let flock = {};
  let isFlockOwner = false;
  let stats = {};
  if (flockId) {
    flock = currentFlockSelector(flocks.data, userSettings);
    isFlockOwner = isFlockOwnerSelector(flocks.data, userSettings, user.uid);
    stats = flockStatsSelector(eggs.data);
  }
  return {
    chickens: chickens.data,
    flockId,
    flock,
    isFlockOwner,
    stats,
  };
};

export default connect(mapStateToProps)(Flock);
