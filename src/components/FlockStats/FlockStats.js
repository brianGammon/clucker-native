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
  loading: boolean,
};

class FlockStats extends React.Component<Props> {
  render() {
    const {
      stats, chickens, flock, loading,
    } = this.props;
    if (loading) {
      return <Loading message="Loading Stats..." />;
    }
    if (!stats || !flock) {
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
  let flock = {};
  if (userSettings.data.currentFlockId) {
    flock = currentFlockSelector(flocks.data, userSettings);
  }
  return {
    flock,
    stats: flockStatsSelector(eggs.data),
    chickens: chickens.data,
    loading: chickens.inProgress || eggs.inProgress,
  };
};

export default connect(mapStateToProps)(FlockStats);
