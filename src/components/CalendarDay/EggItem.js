/* @flow */
import React from 'react';
import {
  View, Text, ListItem, Body, Button, Icon, Badge,
} from 'native-base';
import { type Egg } from '../../types';
import CommonLabel from '../CommonLabel';
import styles from './styles';

type Props = {
  item: string,
  chickenName: string,
  egg: Egg,
  handleMoreOptions: (eggId: string, bulkMode: boolean) => void,
};

const EggItem = ({
  item, egg, chickenName, handleMoreOptions,
}: Props) => (
  <ListItem>
    <Body style={styles.container}>
      <View style={styles.flex}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!egg.bulkMode && (
            <View style={styles.flex}>
              <Text style={styles.label}>{chickenName}</Text>
              <View style={styles.row}>
                <CommonLabel text="Weight: " />
                <Text>{`${egg.weight || '-- '}g`}</Text>
              </View>
            </View>
          )}
          {egg.bulkMode && (
            <View style={styles.flex}>
              <Text style={styles.label}>Bulk Entry</Text>
              <View style={styles.row}>
                <CommonLabel text="Quantity: " />
                <Text>{egg.quantity}</Text>
              </View>
            </View>
          )}
          {egg.damaged && (
            <View style={styles.badgeContainer}>
              <Badge danger>
                <Text style={styles.badgeText}>Damaged</Text>
              </Badge>
            </View>
          )}
        </View>
        {!!egg.notes
          && egg.notes !== '' && (
            <View style={styles.notesContainer}>
              <Icon name="attach" />
              <Text style={styles.eggNote}>{egg.notes}</Text>
            </View>
        )}
      </View>
      <View>
        <Button
          style={styles.moreButton}
          transparent
          dark
          onPress={() => handleMoreOptions(item, egg.bulkMode)}
        >
          <Icon active style={styles.moreIcon} name="more" />
        </Button>
      </View>
    </Body>
  </ListItem>
);

export default EggItem;
