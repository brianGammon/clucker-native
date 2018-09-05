/* @flow */
import React from 'react';
import { View, Text, Button } from 'native-base';
import { type Navigation } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  isFlockOwner: boolean,
};

const NoChickens = ({ navigation, isFlockOwner }: Props) => (
  <View padder style={styles.noChickens}>
    <Text style={styles.noChickensText}>No Chickens Yet</Text>
    {isFlockOwner && (
      <Button transparent onPress={() => navigation.navigate('ChickenEditor')}>
        <Text>Add One?</Text>
      </Button>
    )}
  </View>
);

export default NoChickens;
