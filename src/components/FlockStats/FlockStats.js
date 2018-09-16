/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import FlockStatsRenderer from './FlockStatsRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import Loading from '../Loading';
import NoStats from './NoStats';
import { appStates } from '../../redux/constants';
import {
  type Flock,
  type FlockStats as FlockStatsType,
  type Chicken,
} from '../../types';

type Props = {
  flock: Flock,
  hasFlocks: boolean,
  chickens: {
    [chickenId: string]: Chicken,
  },
  stats: FlockStatsType,
  initialized: boolean,
  loading: boolean,
};

const FlockStats = ({
  hasFlocks,
  stats,
  chickens,
  flock,
  loading,
  initialized,
}: Props) => {
  if (!initialized || loading) {
    return <Loading message="Loading Stats..." />;
  }
  if (initialized && !loading && !stats) {
    return <NoStats flock={flock} hasFlocks={hasFlocks} />;
  }
  return <FlockStatsRenderer stats={stats} chickens={chickens} flock={flock} />;
};

const mapStateToProps = ({
  userSettings,
  eggs,
  flocks,
  chickens,
  appState,
}) => {
  let flock = null;
  let stats = null;
  const hasFlocks = Object.keys(userSettings.data.flocks || {}).length > 0;
  const initialized = userSettings.initialized
    && flocks.initialized
    && appState === appStates.READY;
  if (userSettings.data.currentFlockId && initialized) {
    flock = currentFlockSelector(flocks.data, userSettings);
    if (flock) {
      stats = flockStatsSelector(eggs.data);
    }
  }
  return {
    hasFlocks,
    flock,
    stats,
    chickens: chickens.data,
    initialized,
    loading: chickens.inProgress || eggs.inProgress || userSettings.inProgress,
  };
};

export default connect(mapStateToProps)(FlockStats);
