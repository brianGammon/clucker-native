/* @flow */
import React from 'react';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import FlockStatsRenderer from './FlockStatsRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import {
  type Flock,
  type FlockStats as FlockStatsType,
  type Chicken,
} from '../../types';

type Props = {
  flock: Flock,
  chickens: {
    [chickenId: string]: Chicken,
  },
  stats: FlockStatsType,
};

class FlockStats extends React.Component<Props> {
  render() {
    const { stats, chickens, flock } = this.props;
    if (!stats || !flock) {
      return <Text>No Stats Yet</Text>;
    }
    return (
      <FlockStatsRenderer stats={stats} chickens={chickens} flock={flock} />
    );
  }
}

const mapStateToProps = ({
  userSettings, eggs, flocks, chickens,
}) => {
  let flock = {};
  if (userSettings.data.currentFlockId) {
    flock = currentFlockSelector(flocks.data, userSettings);
  }
  return {
    flock,
    stats: flockStatsSelector(eggs.data),
    chickens: chickens.data,
  };
};

export default connect(mapStateToProps)(FlockStats);
