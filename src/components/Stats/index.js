/* @flow */
import React from 'react';
import {
  View, Text, Separator, ListItem,
} from 'native-base';
import { type FlockStats } from '../../types';
import styles from './styles';

type Props = {
  stats: FlockStats,
};

const Stats = ({ stats }: Props) => (
  <View>
    <Separator>
      <Text>EGG STATS</Text>
    </Separator>
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
        <Text>Average Per Day (30 day)</Text>
      </View>
      <View>
        <Text>{Math.round(10 * stats.averageNumber) / 10}</Text>
      </View>
    </ListItem>
    <ListItem style={styles.li}>
      <View style={styles.flex}>
        <Text>Average Weight</Text>
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
