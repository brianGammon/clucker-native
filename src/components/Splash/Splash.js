import * as React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import styles from './styles';

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <StatusBar barStyle="default" />
  </View>
);
