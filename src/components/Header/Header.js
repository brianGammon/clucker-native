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
import styles from '../DatePicker/styles';

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
}: Props) => (
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
        <Button transparent onPress={() => navigation.navigate('EggEditor')}>
          <Icon active name="add-circle" />
          <Text>Egg</Text>
        </Button>
      )}
    </Right>
  </NBHeader>
);

export default withNavigation(Header);
