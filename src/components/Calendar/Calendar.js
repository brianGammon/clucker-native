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

class Calendar extends React.Component<Props> {
  render() {
    const {
      navigation, calendarData, dates, chickens, stats,
    } = this.props;
    return (
      <CalendarRenderer
        navigation={navigation}
        stats={stats}
        calendarData={calendarData}
        chickens={chickens}
        dates={dates}
      />
    );
  }
}

const mapStateToProps = ({ eggs, chickens }, { navigation }) => {
  const date = navigation.getParam('date', nowAsMoment().format('YYYY-MM'));
  const { previousDate, nextDate } = dateSwitcher(date, 'months', 'YYYY-MM');
  return {
    stats: flockStatsSelector(eggs.data, date),
    calendarData: calendarDataSelector(eggs.data, date),
    chickens: chickens.data,
    dates: {
      date,
      previousDate,
      nextDate,
    },
  };
};

export default connect(mapStateToProps)(Calendar);
