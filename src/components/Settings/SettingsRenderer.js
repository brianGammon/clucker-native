import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { type Flock } from '../../types';
import styles from './styles';

type Props = {
  flocks: {
    [flockId: string]: Flock,
  },
  currentFlockId: string,
  userId: string,
};

const SettingsRenderer = ({ flocks, currentFlockId, userId }: Props) => (
  <ScrollView style={{ padding: 10 }}>
    <View>
      <Text style={styles.sectionLabel}>Account</Text>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.label}>Logged In:</Text>
          <Text style={{ marginRight: 10 }}>test@example.com</Text>
        </View>

        <Button title="Sign Out" onPress={() => {}} />
      </View>
    </View>
    <View style={styles.sectionLine} />
    <View>
      <Text style={styles.sectionLabel}>Flocks</Text>
      <Text style={styles.label}>Select Active Flock</Text>
      <View style={styles.flockSelector}>
        {Object.keys(flocks).map(key => (
          <View key={key} style={[styles.rowContainer, styles.flockRow]}>
            <TouchableOpacity onPress={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={
                    key === currentFlockId
                      ? 'ios-radio-button-on'
                      : 'ios-radio-button-off'
                  }
                  color={key === currentFlockId ? 'green' : 'black'}
                  style={{ fontSize: 24, marginRight: 10 }}
                />

                <Text
                  style={
                    key === currentFlockId
                      ? { fontWeight: 'bold' }
                      : { fontWeight: 'normal' }
                  }
                >
                  {flocks[key].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name={
                  userId === flocks[key].ownedBy
                    ? 'ios-trash-outline'
                    : 'ios-link-outline'
                }
                style={{ fontSize: 24, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>New Flock</Text>
        <View style={styles.rowContainer}>
          <TextInput style={styles.input} onChangeText={(text) => {}} autoFocus />
          <Button title="Save" onPress={() => {}} />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Join Flock</Text>
        <View style={styles.rowContainer}>
          <TextInput style={styles.input} onChangeText={(text) => {}} autoFocus />
          <Button title="Join" onPress={() => {}} />
        </View>
      </View>
    </View>
  </ScrollView>
);
export default SettingsRenderer;
