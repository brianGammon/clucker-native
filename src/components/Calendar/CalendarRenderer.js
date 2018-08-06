/* @flow */
import * as React from 'react';
import {
  Text, Button, ScrollView, View,
} from 'react-native';
import { type Egg } from '../../types';
import styles from './styles';

type Props = {
  navigation: any,
  eggs: {
    [eggId: string]: Egg,
  },
  stats: any,
  dates: {
    date: string,
    previousDate: string,
    nextDate: string,
  },
};

const CalendarRenderer = ({
  navigation, eggs, stats, dates,
}: Props) => (
  <ScrollView>
    <View style={styles.dateSwitcher}>
      <Button
        onPress={() => navigation.replace('Month', { date: dates.previousDate })
        }
        title="Previous"
      />
      <Text>{dates.date}</Text>
      <Button
        disabled={dates.nextDate === null}
        onPress={() => navigation.replace('Month', { date: dates.nextDate })}
        title="Next"
      />
    </View>
    <Text style={{ fontSize: 18 }}>Month Calendar</Text>
    <Text style={{ fontSize: 14 }}>Stats</Text>
    <Text style={{ fontSize: 14 }}>{JSON.stringify(stats, null, 2)}</Text>
    <Text style={{ fontSize: 14 }}>Eggs</Text>
    <Text style={{ fontSize: 14 }}>{JSON.stringify(eggs, null, 2)}</Text>

    <Button onPress={() => navigation.navigate('Day')} title="Today's Eggs" />
  </ScrollView>
);

export default CalendarRenderer;
