/* @flow */
import React from 'react';
import { View, Spinner } from 'native-base';
import styles from './styles';

const ChartLoading = () => (
  <View style={styles.chartLoadingContainer}>
    <View style={styles.spinnerContainer}>
      <Spinner color={styles.spinner.color} />
    </View>
  </View>
);

export default ChartLoading;
