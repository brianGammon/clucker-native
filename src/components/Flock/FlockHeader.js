/* @flow */
import React from 'react';
import {
  View, Text, Button, Icon, H2,
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
      <H2>{flock && flock.name}</H2>
    </View>
    <View style={[styles.header, styles.headerCell, styles.last]}>
      <View style={styles.headerBlock}>
        <Text style={styles.headerCellLabel}>Chickens</Text>
        <H2>{Object.keys(chickens || {}).length}</H2>
      </View>
      {isFlockOwner && (
        <View>
          <Button
            transparent
            dark
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
