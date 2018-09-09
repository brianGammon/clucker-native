/* @flow */
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import { nowAsMoment } from '../../utils/dateHelper';
import ChartRenderer from './ChartRenderer';
import { type FlockStats } from '../../types';

type Props = {
  data: [
    {
      date: Date,
      count: number,
    },
  ],
};

class Chart extends React.Component<Props> {
  render() {
    const { data } = this.props;
    return <ChartRenderer data={data} />;
  }
}

const chartData = (stats: FlockStats) => {
  if (!stats) {
    return [];
  }
  const currMonth = moment(stats.firstEgg.substring(0, 7));
  const thisMonth = moment(nowAsMoment().format('YYYY-MM'));
  const data = [];
  while (currMonth.isSameOrBefore(thisMonth)) {
    const monthAsString = currMonth.format('YYYY-MM');
    let count = 0;
    if (stats.eggsPerPeriod[monthAsString]) {
      count = stats.eggsPerPeriod[monthAsString].total;
    }
    data.push({ date: currMonth.valueOf(), count });
    currMonth.add(1, 'month');
  }

  return data;
};

const mapStateToProps = ({ eggs }) => {
  const stats = flockStatsSelector(eggs.data);
  const data = chartData(stats);

  return {
    data,
  };
};

export default connect(mapStateToProps)(Chart);
