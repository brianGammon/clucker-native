import React from 'react';
import moment from 'moment';
import { Button, Icon, ActionSheet } from 'native-base';
import { type Navigation } from '../../types';
import { nowAsMoment } from '../../utils/dateHelper';

type Props = {
  navigation: Navigation,
};

class ActionButton extends React.Component<Props> {
  handlePress = () => {
    const { navigation } = this.props;
    const chickenId = navigation.getParam('chickenId', null);
    const options = {};
    if (chickenId) {
      options.chickenId = chickenId;
    }
    let date = navigation.getParam('date', null);
    if (date) {
      if (date.length === 7) {
        const now = nowAsMoment();
        if (now.month() === moment.utc(date).month()) {
          date = now.format('YYYY-MM-DD');
        } else {
          date += '-01';
        }
      }
      options.date = date;
    }
    const BUTTONS = ['Log an egg', 'Bulk egg entry', 'Add a chicken', 'Cancel'];
    const ACTIONS = [
      () => navigation.navigate('EggEditor', { ...options }),
      () => navigation.navigate('BulkEditor', { ...options }),
      () => navigation.navigate('ChickenEditor'),
      () => {},
    ];
    const CANCEL_INDEX = 3;
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: 'Select an action:',
      },
      (buttonIndex) => {
        ACTIONS[buttonIndex]();
      },
    );
  };

  render() {
    return (
      <Button transparent onPress={this.handlePress}>
        <Icon active name="add-circle" />
      </Button>
    );
  }
}

export default ActionButton;
