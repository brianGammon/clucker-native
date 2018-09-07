/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import CalendarDayRenderer from './CalendarDayRenderer';
import { nowAsMoment, dateSwitcher } from '../../utils/dateHelper';
import eggsByRangeSelector from '../../selectors/eggsByRangeSelector';
import { metaTypes } from '../../redux/constants';
import { firebaseRemoveRequested } from '../../redux/actions';
import { type Egg } from '../../types';

type Props = {
  navigation: any,
  flockId: string,
  dates: {
    date: string,
    previousDate: string,
    nextDate?: string,
  },
  eggs: {
    [eggId: string]: Egg,
  },
  deleteEgg: (flockId: string, eggId: string) => void,
};

class CalendarDay extends React.Component<Props> {
  onDeleteEgg = (eggId) => {
    const { flockId, deleteEgg } = this.props;
    Alert.alert('Are you sure you want to delete this egg?', null, [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteEgg(flockId, eggId),
        style: 'destructive',
      },
    ]);
  };

  render() {
    const { navigation, dates, eggs } = this.props;
    return (
      <CalendarDayRenderer
        navigation={navigation}
        dates={dates}
        eggs={eggs}
        onDeleteEgg={this.onDeleteEgg}
      />
    );
  }
}

const mapStateToProps = ({ eggs, userSettings }, { navigation }) => {
  const date = navigation.getParam('date', nowAsMoment().format('YYYY-MM-DD'));
  const { previousDate, nextDate } = dateSwitcher(date, 'days', 'YYYY-MM-DD');
  return {
    dates: {
      date,
      previousDate,
      nextDate,
    },
    flockId: userSettings.data.currentFlockId,
    eggs: eggsByRangeSelector(eggs.data, date),
  };
};

const mapDispatchtoProps = dispatch => ({
  deleteEgg: (flockId, eggId) => dispatch(firebaseRemoveRequested({ flockId, eggId }, metaTypes.eggs)),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(CalendarDay);
