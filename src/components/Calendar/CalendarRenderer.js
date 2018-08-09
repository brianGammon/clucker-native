/* @flow */
import * as React from 'react';
import {
  Text, Button, ScrollView, View,
} from 'react-native';
import { type Chicken } from '../../types';
import styles from './styles';

type Props = {
  navigation: any,
  stats: any,
  chickens: {
    [chickenId: string]: Chicken,
  },
  dates: {
    date: string,
    previousDate: string,
    nextDate: string,
  },
};

const CalendarRenderer = ({
  navigation, stats, dates, chickens,
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
    <View>
      {stats
        && Object.keys(stats.eggsPerDay || {}).map(key => (
          <View key={key} style={styles.dayContainer}>
            <View style={styles.dayContainerRow}>
              <Text>{key}</Text>
              <Text>{stats.eggsPerDay[key].total}</Text>
              <Button
                title="View Day"
                onPress={() => navigation.navigate('Day', { date: key })}
              />
            </View>
            {Object.keys(stats.eggsPerDay[key].byChicken || {}).map(
              chickenId => (
                <Text key={chickenId}>
                  {(chickens[chickenId] && chickens[chickenId].name)
                    || 'Unknown'}
                </Text>
              ),
            )}
          </View>
        ))}
    </View>

    <Button onPress={() => navigation.navigate('Day')} title="Today's Eggs" />
  </ScrollView>
);

export default CalendarRenderer;
