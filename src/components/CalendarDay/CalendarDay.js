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
import { type Egg, type Chicken } from '../../types';

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
  chickens: {
    [chickenId: string]: Chicken,
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

  handleMoreOptions = (eggId: string, bulkMode: boolean) => {
    const { navigation } = this.props;
    const BUTTONS = ['Edit Details', 'Delete Egg', 'Cancel'];
    const ACTIONS = [
      () => navigation.navigate(bulkMode ? 'BulkEditor' : 'EggEditor', { eggId }),
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
    const {
      navigation, dates, eggs, chickens,
    } = this.props;
    return (
      <CalendarDayRenderer
        navigation={navigation}
        dates={dates}
        eggs={eggs}
        chickens={chickens}
        handleMoreOptions={this.handleMoreOptions}
      />
    );
  }
}

const mapStateToProps = ({ eggs, chickens }, { navigation }) => {
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
    chickens: chickens.data,
  };
};

const mapDispatchtoProps = dispatch => ({
  deleteEgg: eggId => dispatch(firebaseRemoveRequested({ eggId }, metaTypes.eggs)),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(CalendarDay);
