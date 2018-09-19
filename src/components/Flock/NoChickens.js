/* @flow */
import React from 'react';
import { View, Text } from 'native-base';
import styles from './styles';

const NoChickens = () => (
  <View style={styles.noChickens}>
    <Text>
      No chickens in your flock yet. Add one by tapping the &#34;+&#34; button
      above.
    </Text>
  </View>
);

export default NoChickens;
