import * as React from 'react';
import { connect } from 'react-redux';
import CalendarRenderer from './CalendarRenderer';
import eggsByRangeSelector from '../../selectors/eggsByRangeSelector';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import { type Egg } from '../../types';
import { nowAsMoment } from '../../utils/dateHelper';

type Props = {
  navigation: any,
  eggs: {
    [eggId: string]: Egg,
  },
  stats: any,
};

class Calendar extends React.Component<Props> {
  render() {
    const { navigation, eggs, stats } = this.props;
    return (
      <CalendarRenderer navigation={navigation} eggs={eggs} stats={stats} />
    );
  }
}

const mapStateToProps = ({ eggs }, { navigation }) => {
  const date = navigation.getParam('date', nowAsMoment().format('YYYY-MM'));
  return {
    eggs: eggsByRangeSelector(eggs.data, date),
    stats: flockStatsSelector(eggs.data, date),
  };
};

export default connect(mapStateToProps)(Calendar);
