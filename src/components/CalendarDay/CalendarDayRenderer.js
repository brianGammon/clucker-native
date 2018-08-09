/* @flow */
import * as React from 'react';
import {
  Text, Button, View, ScrollView,
} from 'react-native';
import { type Egg } from '../../types';
import styles from './styles';

type Props = {
  navigation: any,
  dates: {
    date: string,
    previousDate: string,
    nextDate?: string,
  },
  eggs: {
    [eggId: string]: Egg,
  },
  onDeleteEgg: (eggId: string) => void,
};

const CalendarDayRenderer = ({
  navigation,
  eggs,
  dates: { date, previousDate, nextDate },
  onDeleteEgg,
}: Props) => (
  <ScrollView style={styles.container}>
    <View style={styles.dateSwitcher}>
      <Button
        onPress={() => navigation.replace('Day', { date: previousDate })}
        title="Previous"
      />
      <Text>{date}</Text>
      <Button
        disabled={nextDate === null}
        onPress={() => navigation.replace('Day', { date: nextDate })}
        title="Next"
      />
    </View>
    <View>
      {Object.keys(eggs || {}).map(key => (
        <View key={key} style={styles.dayContainer}>
          <View style={styles.dayContainerRow}>
            <View style={{ flex: 1, borderWidth: 1 }}>
              <Text>{eggs[key].chickenName}</Text>
              <Text>{eggs[key].weight || '-- g'}</Text>
              <Text>{eggs[key].notes}</Text>
              <Text>{eggs[key].damaged.toString()}</Text>
            </View>
            <View>
              <Button
                title="Edit"
                onPress={() => navigation.navigate('EggModal', { eggId: key })}
              />
              <Button title="Delete" onPress={() => onDeleteEgg(key)} />
            </View>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

export default CalendarDayRenderer;
