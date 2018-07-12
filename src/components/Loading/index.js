import React from 'react';
import {
  ActivityIndicator, StatusBar, View, Text,
} from 'react-native';

import styles from './styles';

type Props = {
  message: string,
};

export default ({ message }: { message: Props.message }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <StatusBar barStyle="default" />
    {message && <Text>{message}</Text>}
  </View>
);
