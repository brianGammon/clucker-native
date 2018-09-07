/* @flow */
import Moment from 'moment';
import * as momentRange from 'moment-range';
import createCachedSelector from 're-reselect';
import flockStatsSelector from './flockStatsSelector';

const moment = momentRange.extendMoment(Moment);
const getMonth = (state, month) => month;

const calendarDataSelector = createCachedSelector(
  [flockStatsSelector, getMonth],
  (stats, month) => {
    const date = moment(month);
    const range = moment.range(
      date.clone().startOf('month'),
      date.clone().endOf('month'),
    );

    range.start.subtract(range.start.weekday(), 'days');
    range.end.add(6 - range.end.weekday(), 'days');

    const result = {};
    Array.from(range.by('days')).forEach((day) => {
      const formattedDate = day.format('YYYY-MM-DD');
      result[formattedDate] = (stats && stats.eggsPerPeriod[formattedDate]) || {};
    });

    return result;
  },
)(getMonth);

export default calendarDataSelector;
