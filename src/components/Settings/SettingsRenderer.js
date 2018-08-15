import * as React from 'react';
import {
  Text, ScrollView, View, Button, TextInput,
} from 'react-native';
import AddFlock from '../AddFlock';
import JoinFlock from '../JoinFlock';
import FlockSelector from '../FlockSelector';
import { type User } from '../../types';
import styles from './styles';

type Props = {
  user: User,
  handleSignOut: () => void,
};

const SettingsRenderer = ({ handleSignOut, user }: Props) => (
  <ScrollView style={{ padding: 10 }}>
    <View>
      <Text style={styles.sectionLabel}>Account</Text>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.label}>Logged In:</Text>
          <Text style={{ marginRight: 10 }}>
            {user ? user.email : 'unknown user'}
          </Text>
        </View>

        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
    <View style={styles.sectionLine} />
    <View>
      <Text style={styles.sectionLabel}>Flocks</Text>
      <FlockSelector />
      <AddFlock />
      <JoinFlock />
    </View>
  </ScrollView>
);
export default SettingsRenderer;
