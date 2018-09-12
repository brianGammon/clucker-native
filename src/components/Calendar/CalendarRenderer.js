/* @flow */
import * as React from 'react';
import { View, Container, Content } from 'native-base';
import { type Chicken, type CalendarData, type FlockStats } from '../../types';
import Header from '../Header';
import styles from './styles';
import WeekDayLabels from './WeekDayLabels';
import DateSwitcher from '../DateSwitcher';
import Line from '../Line';
import WeekDays from './WeekDays';
import Leaderboard from '../Leaderboard';
import HeaviestEgg from '../HeaviestEgg';
import NoStats from '../NoStats';

type Props = {
  navigation: any,
  currentFlockId: string,
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
  currentFlockId,
  calendarData,
  dates,
  chickens,
  stats,
}: Props) => (
  <Container>
    <Header title="Calendar" eggButton={!!currentFlockId} />
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
        <View>
          <Line />
          <Leaderboard stats={stats} chickens={chickens} mode="month" />
          <Line />
          {stats.heaviest && <HeaviestEgg heaviest={stats.heaviest} />}
        </View>
      )}
      {!stats && <NoStats />}
    </Content>
  </Container>
);

export default CalendarRenderer;
