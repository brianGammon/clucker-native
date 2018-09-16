/* @flow */
import React from 'react';
import moment from 'moment';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import { nowAsMoment } from '../../utils/dateHelper';
import ChartRenderer from './ChartRenderer';
import ChartLoading from './ChartLoading';
import { type FlockStats } from '../../types';

type Props = {
  data: [
    {
      date: Date,
      count: number,
    },
  ],
};

type State = {
  ready: boolean,
};

class Chart extends React.Component<Props, State> {
  state = { ready: true };

  componentDidMount() {
    this.resetChart();
    Dimensions.addEventListener('change', this.resetChart);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resetChart);
  }

  resetChart = () => {
    // react-native-svg-charts has a little issue where
    // the chat doesn't resize certain parts when orientation changes
    // or if the data changes dramatically
    this.setState({ ready: false });
    setTimeout(() => {
      this.setState({ ready: true });
    }, 250);
  };

  render() {
    const { data } = this.props;
    const { ready } = this.state;
    if (!ready) {
      return <ChartLoading />;
    }
    return <ChartRenderer data={data} onRefreshChart={this.resetChart} />;
  }
}

const chartData = (stats: FlockStats) => {
  if (!stats) {
    return [];
  }
  const numPeriods = Object.keys(stats.eggsPerPeriod).length;
  const currMonth = moment(stats.firstEgg.substring(0, 7));
  if (numPeriods < 3) {
    currMonth.subtract(1, 'month');
  }
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
