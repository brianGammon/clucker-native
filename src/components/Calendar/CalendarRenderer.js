import * as React from 'react';
import { Text, Button, ScrollView } from 'react-native';
import { type Egg } from '../../types';

type Props = {
  navigation: any,
  eggs: {
    [eggId: string]: Egg,
  },
  stats: any,
};

const CalendarRenderer = ({ navigation, eggs, stats }: Props) => (
  <ScrollView>
    <Text style={{ fontSize: 18 }}>Month Calendar</Text>
    <Text style={{ fontSize: 14 }}>Stats</Text>
    <Text style={{ fontSize: 14 }}>{JSON.stringify(stats, null, 2)}</Text>
    <Text style={{ fontSize: 14 }}>Eggs</Text>
    <Text style={{ fontSize: 14 }}>{JSON.stringify(eggs, null, 2)}</Text>

    <Button onPress={() => navigation.navigate('Day')} title="Today's Eggs" />
  </ScrollView>
);

export default CalendarRenderer;
