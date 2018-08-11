import * as React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import styles from './styles';

const Splash = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <StatusBar barStyle="default" />
  </View>
);

export default Splash;
