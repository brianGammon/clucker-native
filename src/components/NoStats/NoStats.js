import React from 'react';
import { View, Text } from 'native-base';
import Line from '../Line';
import styles from './styles';

type Props = {
  message: string | null,
};

const NoStats = ({ message }: Props) => (
  <View style={styles.container}>
    <Line />
    <Text style={styles.message}>
      {message || 'No stats available for this period'}
    </Text>
  </View>
);

export default NoStats;
