/* @flow */
import React from 'react';
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
  const date = navigation.getParam('date', null);
  if (date) {
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
