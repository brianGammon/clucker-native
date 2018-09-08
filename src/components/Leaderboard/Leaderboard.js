/* @flow */
import React from 'react';
import { View, Text } from 'native-base';
import styles from './styles';
import { type FlockStats, type Chicken } from '../../types';

type Props = {
  mode: 'month' | 'allTime',
  stats: FlockStats,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const Leaderboard = ({ stats, chickens, mode }: Props) => (
  <View style={styles.container}>
    <Text style={styles.statsLabel}>
      {`${mode === 'allTime' ? 'All Time' : ''} Leaderboard`}
    </Text>
    <View style={[styles.row, styles.headerRow]}>
      <Text style={styles.wideLabel}>Chicken</Text>
      <View>
        <Text style={styles.label}>Eggs</Text>
      </View>
    </View>
    {Object.keys(stats.eggsPerChicken).map(key => (
      <View key={key} style={styles.row}>
        <Text style={styles.wideValue}>
          {chickens[key] ? chickens[key].name : 'Unknown'}
        </Text>
        <Text style={styles.value}>{stats.eggsPerChicken[key]}</Text>
      </View>
    ))}
  </View>
);

export default Leaderboard;
