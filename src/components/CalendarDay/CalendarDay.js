/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionSheet } from 'native-base';
import { Alert } from 'react-native';
import CalendarDayRenderer from './CalendarDayRenderer';
import { nowAsMoment, dateSwitcher } from '../../utils/dateHelper';
import eggsByRangeSelector from '../../selectors/eggsByRangeSelector';
import { metaTypes } from '../../redux/constants';
import { firebaseRemoveRequested } from '../../redux/actions';
import { type Egg } from '../../types';

type Props = {
  navigation: any,
  dates: {
    now: string,
    date: string,
    previousDate: string,
    nextDate?: string,
  },
  eggs: {
    [eggId: string]: Egg,
  },
  deleteEgg: (eggId: string) => void,
};

class CalendarDay extends React.Component<Props> {
  deleteEgg = (eggId) => {
    const { deleteEgg } = this.props;
    Alert.alert('Are you sure you want to delete this egg?', null, [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteEgg(eggId),
        style: 'destructive',
      },
    ]);
  };

  handleMoreOptions = (eggId: string) => {
    const { navigation } = this.props;
    const BUTTONS = ['Edit Details', 'Delete Egg', 'Cancel'];
    const ACTIONS = [
      () => navigation.navigate('EggEditor', { eggId }),
      () => this.deleteEgg(eggId),
      () => {},
    ];
    const DESTRUCTIVE_INDEX = 1;
    const CANCEL_INDEX = 2;
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Additonal Actions',
      },
      (buttonIndex) => {
        ACTIONS[buttonIndex]();
      },
    );
  };

  render() {
    const { navigation, dates, eggs } = this.props;
    return (
      <CalendarDayRenderer
        navigation={navigation}
        dates={dates}
        eggs={eggs}
        handleMoreOptions={this.handleMoreOptions}
      />
    );
  }
}

const mapStateToProps = ({ eggs }, { navigation }) => {
  const now = nowAsMoment();
  const date = navigation.getParam('date', now.clone().format('YYYY-MM-DD'));
  const { previousDate, nextDate } = dateSwitcher(date, 'days', 'YYYY-MM-DD');
  return {
    dates: {
      now: now.format('YYYY-MM-DD'),
      date,
      previousDate,
      nextDate,
    },
    eggs: eggsByRangeSelector(eggs.data, date),
  };
};

const mapDispatchtoProps = dispatch => ({
  deleteEgg: eggId => dispatch(firebaseRemoveRequested({ eggId }, metaTypes.eggs)),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(CalendarDay);
