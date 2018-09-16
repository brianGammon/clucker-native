import * as React from 'react';
import { connect } from 'react-redux';
import CalendarRenderer from './CalendarRenderer';
import calendarDataSelector from '../../selectors/calendarDataSelector';
import { nowAsMoment, dateSwitcher } from '../../utils/dateHelper';
import { type Chicken, type CalendarData, type FlockStats } from '../../types';
import flockStatsSelector from '../../selectors/flockStatsSelector';

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

const Calendar = ({
  navigation,
  calendarData,
  dates,
  chickens,
  stats,
}: Props) => (
  <CalendarRenderer
    navigation={navigation}
    stats={stats}
    calendarData={calendarData}
    chickens={chickens}
    dates={dates}
  />
);

const mapStateToProps = ({ eggs, chickens }, { navigation }) => {
  const now = nowAsMoment();
  const date = navigation.getParam('date', now.clone().format('YYYY-MM'));
  const { previousDate, nextDate } = dateSwitcher(date, 'months', 'YYYY-MM');
  return {
    stats: flockStatsSelector(eggs.data, date),
    calendarData: calendarDataSelector(eggs.data, date),
    chickens: chickens.data,
    dates: {
      now: now.format('YYYY-MM'),
      date,
      previousDate,
      nextDate,
    },
  };
};

export default connect(mapStateToProps)(Calendar);
