/* @flow */
import * as React from 'react';
import {
  Container, Content, View, Text, Button, Icon,
} from 'native-base';
import Header from '../Header';
import CommonLabel from '../CommonLabel';
import { type User } from '../../types';
import styles from './styles';

type Props = {
  user: User,
  handleSignOut: () => void,
};

const SettingsRenderer = ({ handleSignOut, user }: Props) => (
  <Container>
    <Header title="Settings" />
    <Content padder>
      <Text style={styles.sectionLabel}>Account</Text>
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
    </Content>
  </Container>
);
export default SettingsRenderer;
