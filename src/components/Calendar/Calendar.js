import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarRenderer from './CalendarRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import { nowAsMoment, dateStringAsMoment } from '../../utils/dateHelper';
import { type Chicken } from '../../types';

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

class Calendar extends React.Component<Props> {
  render() {
    const {
      navigation, stats, dates, chickens,
    } = this.props;
    return (
      <CalendarRenderer
        navigation={navigation}
        stats={stats}
        chickens={chickens}
        dates={dates}
      />
    );
  }
}

const mapStateToProps = ({ eggs, chickens }, { navigation }) => {
  const date = navigation.getParam('date', nowAsMoment().format('YYYY-MM'));
  const currDate = moment.utc(date);
  const previousDate = currDate
    .subtract(1, 'months')
    .format('YYYY-MM')
    .toString();
  let nextDate = currDate
    .add(2, 'months')
    .format('YYYY-MM')
    .toString();
  if (dateStringAsMoment(nextDate).isAfter(nowAsMoment())) {
    nextDate = null;
  }
  return {
    stats: flockStatsSelector(eggs.data, date),
    chickens: chickens.data,
    dates: {
      date,
      previousDate,
      nextDate,
    },
  };
};

export default connect(mapStateToProps)(Calendar);
