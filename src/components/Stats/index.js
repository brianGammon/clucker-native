/* @flow */
import React from 'react';
import { View, Text, ListItem } from 'native-base';
import { type FlockStats } from '../../types';
import Separator from '../Separator';
import styles from './styles';

type Props = {
  stats: FlockStats,
  mode: 'month' | 'allTime',
};

const Stats = ({ stats, mode }: Props) => (
  <View>
    <Separator text="EGGS STATS" />
    <ListItem style={styles.li}>
      <View style={styles.flex}>
        <Text>Total Laid</Text>
      </View>
      <View>
        <Text>{stats.total}</Text>
      </View>
    </ListItem>
    <ListItem style={styles.li}>
      <View style={styles.flex}>
        <Text>{`Avg Per Day${mode === 'month' ? '' : ' (30 day)'}`}</Text>
      </View>
      <View>
        <Text>{Math.round(10 * stats.averageNumber) / 10}</Text>
      </View>
    </ListItem>
    <ListItem style={styles.li}>
      <View style={styles.flex}>
        <Text>Avg Weight</Text>
      </View>
      <View>
        <Text>
          {stats.averageWeight > 0
            ? Math.round(10 * stats.averageWeight) / 10
            : '--'}
          g
        </Text>
      </View>
    </ListItem>
    <ListItem style={styles.li}>
      <View style={styles.flex}>
        <Text>Heaviest Egg</Text>
      </View>
      <View>
        <Text>{stats.heaviest ? stats.heaviest.weight : '-- '}g</Text>
      </View>
    </ListItem>
  </View>
);

export default Stats;
