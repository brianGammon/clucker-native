/* @flow */
import * as React from 'react';
import { Linking } from 'react-native';
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
import {
  PRIVACY_POLICY_URI,
  TERMS_OF_USE_URI,
  APP_VERSION,
} from '../../constants';

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
          <Text>{APP_VERSION}</Text>
        </Right>
      </ListItem>
      <ListItem onPress={() => Linking.openURL(PRIVACY_POLICY_URI)}>
        <Left>
          <Text>Privacy Policy</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
      <ListItem onPress={() => Linking.openURL(TERMS_OF_USE_URI)}>
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
