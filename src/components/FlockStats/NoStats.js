/* @flow */
import React from 'react';
import { Container, View, Text } from 'native-base';
import Header from '../Header';
import { type Flock } from '../../types';
import styles from './styles';

type Props = {
  flock: Flock | null,
};

const NoStats = ({ flock }: Props) => (
  <Container>
    <Header
      title="Flock Stats"
      subTitle={(flock && flock.name) || 'No Active Flock'}
      eggButton
    />

    <View padder style={styles.noEggsMessage}>
      <Text>No eggs have been logged yet</Text>
    </View>
  </Container>
);

export default NoStats;
