import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const Splash = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default Splash;
