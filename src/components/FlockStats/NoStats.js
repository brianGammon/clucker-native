/* @flow */
import React from 'react';
import { Container, View, Text } from 'native-base';
import Header from '../Header';
import styles from './styles';

const NoStats = () => (
  <Container>
    <Header title="Flock Stats" eggButton />

    <View padder style={styles.noEggsMessage}>
      <Text>You have not logged any eggs yet</Text>
    </View>
  </Container>
);

export default NoStats;
