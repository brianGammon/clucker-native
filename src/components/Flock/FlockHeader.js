/* @flow */
import React from 'react';
import {
  View, Text, Button, Icon,
} from 'native-base';
import styles from './styles';
import { type Flock, type Chicken, type Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  flock: Flock,
  chickens: {
    [chickenId: string]: Chicken,
  },
  isFlockOwner: boolean,
};

const FlockHeader = ({
  navigation, flock, chickens, isFlockOwner,
}: Props) => (
  <View padder style={styles.header}>
    <View style={styles.headerCell}>
      <Text style={styles.headerCellLabel}>Flock Name</Text>
      <Text style={styles.headerCellText}>{flock && flock.name}</Text>
    </View>
    <View style={[styles.header, styles.headerCell, styles.last]}>
      <View style={styles.headerBlock}>
        <Text style={styles.headerCellLabel}>Chickens</Text>
        <Text style={styles.headerCellText}>
          {Object.keys(chickens || {}).length}
        </Text>
      </View>
      {isFlockOwner && (
        <View>
          <Button
            transparent
            onPress={() => navigation.navigate('ChickenEditor')}
          >
            <Icon active name="add-circle" />
            {/* <Text style={styles.addText}>Chicken</Text> */}
          </Button>
        </View>
      )}
    </View>
  </View>
);

export default FlockHeader;
