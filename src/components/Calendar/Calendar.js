import * as React from 'react';
import { connect } from 'react-redux';
import CalendarRenderer from './CalendarRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import { nowAsMoment, dateSwitcher } from '../../utils/dateHelper';
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
  const { previousDate, nextDate } = dateSwitcher(date, 'months', 'YYYY-MM');
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
