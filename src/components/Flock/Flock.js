/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockRenderer from './FlockRenderer';
import { type Chicken, type Navigation, type FlockStats } from '../../types';
import flockStatsSelector from '../../selectors/flockStatsSelector';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  stats: FlockStats,
};

const Flock = ({ navigation, chickens, stats }: Props) => (
  <FlockRenderer
    navigation={navigation}
    chickens={chickens}
    topProducer={stats && stats.mostEggs}
  />
);

const mapStateToProps = ({ chickens, eggs }) => ({
  chickens: chickens.data,
  stats: flockStatsSelector(eggs.data),
});

export default connect(mapStateToProps)(Flock);
