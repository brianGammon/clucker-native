/* @flow */
import * as React from 'react';
import {
  View, Text, Container, Content, H3,
} from 'native-base';
import { type Chicken, type CalendarData, type FlockStats } from '../../types';
import Header from '../Header';
import styles from './styles';
import WeekDayLabels from './WeekDayLabels';
import DateSwitcher from '../DateSwitcher';
import WeekDays from './WeekDays';

type Props = {
  navigation: any,
  stats: FlockStats,
  calendarData: CalendarData,
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
  navigation,
  calendarData,
  dates,
  chickens,
  stats,
}: Props) => (
  <Container>
    <Header title="Calendar" eggButton />
    <Content padder>
      <DateSwitcher
        mode="month"
        navigation={navigation}
        dates={dates}
        eggCount={stats && stats.total}
      />

      <View style={styles.section}>
        <WeekDayLabels />
        <WeekDays
          calendarData={calendarData}
          month={dates.date}
          navigation={navigation}
        />
      </View>

      {stats && (
        <View
          style={[
            styles.section,
            { flexDirection: 'row', justifyContent: 'space-around' },
          ]}
        >
          {chickens[stats.mostEggs] && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statsLabel}>Top Producer</Text>
              <H3>
                {`${chickens[stats.mostEggs].name} (${
                  stats.eggsPerChicken[stats.mostEggs]
                })`}
              </H3>
            </View>
          )}
          {stats.heaviest && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statsLabel}>Heaviest</Text>
              <H3>{stats.heaviest.chickenName}</H3>
              <Text>{`${stats.heaviest.weight}g`}</Text>
            </View>
          )}
        </View>
      )}
    </Content>
  </Container>
);

export default CalendarRenderer;
