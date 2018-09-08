/* @flow */
import React from 'react';
import moment from 'moment';
import { View, Text } from 'native-base';
import styles from './styles';
import { type Egg } from '../../types';

type Props = {
  heaviest: Egg,
};

const HeaviestEgg = ({ heaviest }: Props) => (
  <View style={styles.container}>
    <Text style={styles.statsLabel}>Heaviest</Text>
    <View style={[styles.row, styles.headerRow]}>
      <Text style={styles.wideLabel}>Chicken</Text>
      <Text style={styles.medLabel}>Weight(g)</Text>
      <Text style={styles.medLabel}>Date</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.wideValue}>{heaviest.chickenName}</Text>
      <Text style={styles.value}>{heaviest.weight}</Text>
      <Text style={styles.value}>
        {moment(heaviest.date).format('MMM D, YYYY')}
      </Text>
    </View>
  </View>
);

export default HeaviestEgg;
