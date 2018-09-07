import React from 'react';
import { View, Text } from 'native-base';
import styles from './styles';

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WeekDayLabels = () => (
  <View style={styles.labelContainer}>
    {labels.map(day => (
      <View key={day} style={styles.labelCell}>
        <Text style={styles.label}>{day}</Text>
      </View>
    ))}
  </View>
);

export default WeekDayLabels;
