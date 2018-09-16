/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import FlockStatsRenderer from './FlockStatsRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import Loading from '../Loading';
import NoStats from './NoStats';
import { appStates } from '../../redux/constants';
import { type FlockStats as FlockStatsType, type Chicken } from '../../types';

type Props = {
  chickens: {
    [chickenId: string]: Chicken,
  },
  stats: FlockStatsType,
  initialized: boolean,
  loading: boolean,
};

const FlockStats = ({
  stats, chickens, loading, initialized,
}: Props) => {
  if (!initialized || loading) {
    return <Loading message="Loading Stats..." />;
  }
  if (initialized && !loading && !stats) {
    return <NoStats />;
  }
  return <FlockStatsRenderer stats={stats} chickens={chickens} />;
};

const mapStateToProps = ({ eggs, chickens, appState }) => {
  let stats = null;
  const initialized = chickens.initialized && eggs.initialized && appState === appStates.READY;
  if (initialized) {
    stats = flockStatsSelector(eggs.data);
  }
  return {
    stats,
    chickens: chickens.data,
    initialized,
    loading: chickens.inProgress || eggs.inProgress,
  };
};

export default connect(mapStateToProps)(FlockStats);
