/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import CalendarDayRenderer from './CalendarDayRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import eggsByDaySelector from '../../selectors/eggsByDaySelector';
import { type Egg } from '../../types';

type Props = {
  navigation: any,
  date: string,
  eggs: {
    [eggId: string]: Egg,
  },
};

class CalendarDay extends React.Component<Props> {
  render() {
    const { navigation, date, eggs } = this.props;
    return (
      <CalendarDayRenderer navigation={navigation} date={date} eggs={eggs} />
    );
  }
}

const mapStateToProps = ({ eggs, chickens }, { navigation }) => {
  const date = navigation.getParam('date', nowAsMoment().format('YYYY-MM-DD'));
  return {
    date,
    eggs: eggsByDaySelector(eggs.data, date),
    chickens,
  };
};

export default connect(mapStateToProps)(CalendarDay);
