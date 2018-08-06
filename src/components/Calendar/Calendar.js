import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarRenderer from './CalendarRenderer';
import eggsByRangeSelector from '../../selectors/eggsByRangeSelector';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import { type Egg } from '../../types';
import { nowAsMoment, dateStringAsMoment } from '../../utils/dateHelper';

type Props = {
  navigation: any,
  eggs: {
    [eggId: string]: Egg,
  },
  stats: any,
  dates: {
    date: string,
    previousDate: string,
    nextDate: string,
  },
};

class Calendar extends React.Component<Props> {
  render() {
    const {
      navigation, eggs, stats, dates,
    } = this.props;
    return (
      <CalendarRenderer
        navigation={navigation}
        eggs={eggs}
        stats={stats}
        dates={dates}
      />
    );
  }
}

const mapStateToProps = ({ eggs }, { navigation }) => {
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
    eggs: eggsByRangeSelector(eggs.data, date),
    stats: flockStatsSelector(eggs.data, date),
    dates: {
      date,
      previousDate,
      nextDate,
    },
  };
};

export default connect(mapStateToProps)(Calendar);
