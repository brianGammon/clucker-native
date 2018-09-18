/* @flow */
import React from 'react';
import { withNavigation } from 'react-navigation';
import {
  Header as NBHeader,
  Left,
  Right,
  Body,
  Title,
  Subtitle,
  Button,
  Text,
  Icon,
} from 'native-base';
import { type Navigation } from '../../types';
import ActionButton from '../ActionButton';
import styles from './styles';

type Props = {
  navigation: Navigation,
  title: string,
  subTitle: string | null,
  goBackButton: string,
  cancelButton: boolean,
  eggButton: boolean,
  handleSave: () => {},
  saveDisabled: boolean,
};
export const Header = ({
  navigation,
  title,
  subTitle,
  goBackButton,
  eggButton,
  cancelButton,
  handleSave,
  saveDisabled,
}: Props) => (
  <NBHeader>
    <Left>
      {cancelButton && (
        <Button transparent onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </Button>
      )}
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
      {subTitle
        && subTitle !== '' && (
          <Subtitle numberOfLines={2} ellipsizeMode="tail">
            {subTitle}
          </Subtitle>
      )}
    </Body>
    <Right>
      {eggButton && <ActionButton navigation={navigation} />}
      {handleSave && (
        <Button transparent disabled={saveDisabled} onPress={handleSave}>
          <Text>Save</Text>
        </Button>
      )}
    </Right>
  </NBHeader>
);

export default withNavigation(Header);
