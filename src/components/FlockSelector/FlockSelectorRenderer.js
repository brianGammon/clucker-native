import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, TouchableOpacity } from 'react-native';
import { type Flock } from '../../types';
import styles from './styles';

type Props = {
  flocks: {
    [flockId: string]: Flock,
  },
  currentFlockId: string,
  userId: string,
  handleSelectFlock: (flockId: string) => void,
};

const FlockSelectorRenderer = ({
  flocks,
  currentFlockId,
  userId,
  handleSelectFlock,
}: Props) => (
  <View>
    <Text style={styles.label}>Select Active Flock</Text>
    <View style={styles.flockSelector}>
      {Object.keys(flocks).map(key => (
        <View key={key} style={[styles.rowContainer, styles.flockRow]}>
          <TouchableOpacity onPress={() => handleSelectFlock(key)}>
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
  </View>
);
export default FlockSelectorRenderer;
