import React from 'react';
import moment from 'moment';
import {
  View, Button, Text, H3, H2, Icon,
} from 'native-base';
import styles from './styles';
import { type Navigation } from '../../types';

type Props = {
  mode: 'month' | 'day',
  navigation: Navigation,
  dates: {
    date: string,
    previousDate: string,
    nextDate: string,
  },
  eggCount: number | null,
};

const DateSwitcher = ({
  navigation, dates, eggCount, mode,
}: Props) => (
  <View style={styles.rowContainer}>
    <View style={styles.dateSwitcher}>
      <Button
        transparent
        dark
        onPress={() => navigation.replace(mode === 'month' ? 'Month' : 'Day', {
          date: dates.previousDate,
        })
        }
      >
        <Icon name="arrow-back" />
      </Button>
      <H2 style={styles.monthTitle}>
        {moment(dates.date).format(mode === 'month' ? 'MMMM YYYY' : 'MMMM D')}
      </H2>
      <Button
        transparent
        dark
        disabled={dates.nextDate === null}
        onPress={() => navigation.replace(mode === 'month' ? 'Month' : 'Day', {
          date: dates.nextDate,
        })
        }
      >
        <Icon name="arrow-forward" />
      </Button>
    </View>
    <View style={styles.eggStats}>
      <Text style={styles.statsLabel}>Eggs</Text>
      <H3>{eggCount || 0}</H3>
    </View>
  </View>
);

export default DateSwitcher;
