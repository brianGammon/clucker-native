/* @flow */
import React from 'react';
import { View, Text } from 'native-base';
import styles from './styles';
import { type Flock, type Chicken } from '../../types';

type Props = {
  flock: Flock,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const FlockHeader = ({ flock, chickens }: Props) => (
  <View padder style={styles.header}>
    <View style={styles.headerCell}>
      <Text style={styles.headerCellLabel}>Flock Name</Text>
      <Text style={styles.headerCellText}>{flock && flock.name}</Text>
    </View>
    <View style={[styles.headerCell, styles.last]}>
      <Text style={styles.headerCellLabel}>Chickens</Text>
      <Text style={styles.headerCellText}>
        {Object.keys(chickens || {}).length}
      </Text>
    </View>
  </View>
);

export default FlockHeader;
