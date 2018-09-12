/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import FlockStatsRenderer from './FlockStatsRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import Loading from '../Loading';
import NoStats from './NoStats';
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
  initialized: boolean,
  loading: boolean,
};

class FlockStats extends React.Component<Props> {
  render() {
    const {
      stats, chickens, flock, loading, initialized,
    } = this.props;
    if (!initialized || loading) {
      return <Loading message="Loading Stats..." />;
    }
    if (initialized && !loading && !stats) {
      return <NoStats flock={flock} />;
    }
    return (
      <FlockStatsRenderer stats={stats} chickens={chickens} flock={flock} />
    );
  }
}

const mapStateToProps = ({
  userSettings, eggs, flocks, chickens,
}) => {
  let flock = null;
  let stats = null;
  const initialized = userSettings.initialized && flocks.initialized;
  if (userSettings.data.currentFlockId && initialized) {
    flock = currentFlockSelector(flocks.data, userSettings);
    if (flock) {
      stats = flockStatsSelector(eggs.data);
    }
  }
  return {
    flock,
    stats,
    chickens: chickens.data,
    initialized,
    loading: chickens.inProgress || eggs.inProgress || userSettings.inProgress,
  };
};

export default connect(mapStateToProps)(FlockStats);
