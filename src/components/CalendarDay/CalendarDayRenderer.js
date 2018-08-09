/* @flow */
import * as React from 'react';
import { Text, Button, View } from 'react-native';
import { type Egg } from '../../types';
import styles from './styles';

type Props = {
  navigation: any,
  date: string,
  eggs: {
    [eggId: string]: Egg,
  },
};

const CalendarDayRenderer = ({ navigation, eggs, date }: Props) => (
  <View style={styles.container}>
    <Text>{`Eggs for: ${date}`}</Text>
    <Text>{JSON.stringify(eggs, null, 2)}</Text>
    <Button onPress={() => navigation.goBack()} title="Back to Month" />
  </View>
);

export default CalendarDayRenderer;
