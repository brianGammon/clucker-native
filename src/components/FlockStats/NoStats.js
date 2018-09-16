/* @flow */
import React from 'react';
import { Container, View, Text } from 'native-base';
import Header from '../Header';
import { type Flock } from '../../types';
import FlockManager from '../FlockManager';
import styles from './styles';

type Props = {
  hasFlocks: boolean,
  flock: Flock | null,
};

const NoStats = ({ flock, hasFlocks }: Props) => (
  <Container>
    <Header
      title="Flock Stats"
      subTitle={(flock && flock.name) || 'No Active Flock'}
      eggButton={flock ? true : null}
    />

    <View padder style={styles.noEggsMessage}>
      {!flock && <FlockManager hasFlocks={hasFlocks} />}
      {flock && <Text>You have not logged any eggs yet</Text>}
    </View>
  </Container>
);

export default NoStats;
