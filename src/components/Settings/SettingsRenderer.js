/* @flow */
import * as React from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Button,
  Icon,
  ListItem,
  Left,
  Right,
} from 'native-base';
import Header from '../Header';
import CommonLabel from '../CommonLabel';
import Separator from '../Separator';
import { type User } from '../../types';
import styles from './styles';

type Props = {
  user: User,
  handleSignOut: () => void,
};

const SettingsRenderer = ({ handleSignOut, user }: Props) => (
  <Container>
    <Header title="Settings" />
    <Content>
      <Separator text="ACCOUNT" />
      <View padder style={styles.rowContainer}>
        <View style={styles.profileContainer}>
          <Icon style={styles.profileIcon} active name="person" />
          <View style={styles.profileInfo}>
            <CommonLabel text="Logged In:" />
            <Text>{user ? user.email : 'unknown user'}</Text>
          </View>
        </View>

        <Button transparent onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
      </View>
      <Separator text="ABOUT" />
      <ListItem>
        <Left>
          <Text>Version</Text>
        </Left>
        <Right>
          <Text>1.0.0</Text>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Text>Privacy Policy</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Text>Terms of Use</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    </Content>
  </Container>
);
export default SettingsRenderer;
