/* @flow */
import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'native-base';
import FlockSelector from '../FlockSelector';
import AddFlock from '../AddFlock';
import JoinFlock from '../JoinFlock';
import styles from './styles';

type Props = {
  hasFlocks: boolean,
};

const FlockManager = ({ hasFlocks }: Props) => (
  <View>
    {!hasFlocks && (
      <View padder style={styles.noFlocksMessage}>
        <Image
          source={require('../../assets/chicken-sm.png')}
          style={styles.image}
        />
        <Text style={styles.noFlocksMessageText}>
          To start tracking eggs, either create a new flock or join an existing
          flock below.
        </Text>
      </View>
    )}
    {hasFlocks && <FlockSelector />}
    <AddFlock />
    <JoinFlock />
  </View>
);

export default FlockManager;
