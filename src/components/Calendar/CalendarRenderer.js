/* @flow */
import * as React from 'react';
import {
  View, Container, Content, Text,
} from 'native-base';
import { type Chicken, type CalendarData, type FlockStats } from '../../types';
import Header from '../Header';
import styles from './styles';
import WeekDayLabels from './WeekDayLabels';
import DateSwitcher from '../DateSwitcher';
import Line from '../Line';
import WeekDays from './WeekDays';
import Leaderboard from '../Leaderboard';
import HelpMessage from '../HelpMessage';
import Stats from '../Stats';

type Props = {
  navigation: any,
  stats: FlockStats,
  calendarData: CalendarData,
  chickens: {
    [chickenId: string]: Chicken,
  },
  dates: {
    now: string,
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
    <Header title="Month Stats" eggButton />
    <Content>
      <DateSwitcher mode="month" navigation={navigation} dates={dates} />

      <View style={styles.section}>
        <WeekDayLabels />
        <WeekDays
          calendarData={calendarData}
          month={dates.date}
          navigation={navigation}
        />
      </View>

      {stats && (
        <View>
          <Stats stats={stats} mode="month" />
          <Leaderboard stats={stats} chickens={chickens} />
        </View>
      )}
      {!stats && (
        <View padder>
          <HelpMessage>
            <Text>No eggs logged for this period.</Text>
          </HelpMessage>
        </View>
      )}
    </Content>
  </Container>
);

export default CalendarRenderer;
