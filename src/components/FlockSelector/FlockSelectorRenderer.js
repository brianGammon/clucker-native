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
  handleUnlinkFlock: (flockId: string) => void,
  handleDeleteFlock: (flockId: string) => void,
};

const FlockSelectorRenderer = ({
  flocks,
  currentFlockId,
  userId,
  handleSelectFlock,
  handleUnlinkFlock,
  handleDeleteFlock,
}: Props) => (
  <View>
    <Text style={styles.label}>Select Active Flock</Text>
    <View style={styles.flockSelector}>
      {Object.keys(flocks).map((key) => {
        const isOwner = userId === flocks[key].ownedBy;
        const currentlyActive = key === currentFlockId;
        return (
          <View key={key} style={[styles.rowContainer, styles.flockRow]}>
            <TouchableOpacity onPress={() => handleSelectFlock(key)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={
                    currentlyActive
                      ? 'ios-radio-button-on'
                      : 'ios-radio-button-off'
                  }
                  color={currentlyActive ? 'green' : 'black'}
                  style={{ fontSize: 24, marginRight: 10 }}
                />
                <Text
                  style={
                    currentlyActive
                      ? { fontWeight: 'bold' }
                      : { fontWeight: 'normal' }
                  }
                >
                  {flocks[key].name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (isOwner ? handleDeleteFlock(key) : handleUnlinkFlock(key))
              }
            >
              <Ionicons
                name={isOwner ? 'ios-trash-outline' : 'ios-link-outline'}
                style={{ fontSize: 24, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  </View>
);
export default FlockSelectorRenderer;
