/* @flow */
import * as React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Container,
  Content,
  H2,
  H3,
  Button,
  Icon,
} from 'native-base';
import { type Chicken, type CalendarData, type FlockStats } from '../../types';
import styles from './styles';
import WeekDayLabels from './WeekDayLabels';
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
    <Content padder>
      <View style={styles.dateSwitcher}>
        <Button
          transparent
          dark
          onPress={() => navigation.replace('Month', { date: dates.previousDate })
          }
        >
          <Icon name="arrow-back" />
        </Button>
        <H2 style={styles.monthTitle}>
          {moment(dates.date).format('MMMM YYYY')}
        </H2>
        <Button
          transparent
          dark
          disabled={dates.nextDate === null}
          onPress={() => navigation.replace('Month', { date: dates.nextDate })}
        >
          <Icon name="arrow-forward" />
        </Button>
      </View>

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
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.statsLabel}>Eggs</Text>
            <H3>{stats.total}</H3>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.statsLabel}>Top Producer</Text>
            <H3>
              {`${chickens[stats.mostEggs].name} (${
                stats.eggsPerChicken[stats.mostEggs]
              })`}
            </H3>
          </View>
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
