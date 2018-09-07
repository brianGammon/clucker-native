/* @flow */
import React from 'react';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import {
  Header as NBHeader,
  Left,
  Right,
  Body,
  Title,
  Button,
  Text,
  Icon,
} from 'native-base';
import { type Navigation } from '../../types';
import { nowAsMoment } from '../../utils/dateHelper';
import styles from './styles';

type Props = {
  navigation: Navigation,
  title: string,
  goBackButton: string,
  cancelButton: boolean,
  eggButton: boolean,
};
export const Header = ({
  navigation,
  title,
  goBackButton,
  eggButton,
  cancelButton,
}: Props) => {
  const chickenId = navigation.getParam('chickenId', null);
  const options = {};
  if (chickenId) {
    options.chickenId = chickenId;
  }
  let date = navigation.getParam('date', null);
  if (date) {
    if (date.length === 7) {
      const now = nowAsMoment();
      if (now.month() === moment(date).month()) {
        date = now.format('YYYY-MM-DD');
      } else {
        date += '-01';
      }
    }
    options.date = date;
  }
  return (
    <NBHeader>
      <Left>
        {goBackButton !== undefined && (
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon active name="arrow-back" />
            {goBackButton !== '' && (
              <Text style={styles.goBackText}>{goBackButton}</Text>
            )}
          </Button>
        )}
      </Left>
      <Body>
        <Title>{title || 'Default Title'}</Title>
      </Body>
      <Right>
        {cancelButton && (
          <Button transparent onPress={() => navigation.goBack()}>
            <Text>Cancel</Text>
          </Button>
        )}
        {eggButton && (
          <Button
            transparent
            onPress={() => navigation.navigate('EggEditor', options)}
          >
            <Icon style={{ fontSize: 24 }} active name="add-circle" />
            <Text style={{ paddingLeft: 5 }}>Egg</Text>
          </Button>
        )}
      </Right>
    </NBHeader>
  );
};

export default withNavigation(Header);
