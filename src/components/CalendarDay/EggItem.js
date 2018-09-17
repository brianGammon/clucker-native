/* @flow */
import React from 'react';
import {
  View, Text, ListItem, Body, Button, Icon, Badge,
} from 'native-base';
import { type Egg } from '../../types';
import styles from './styles';

type Props = {
  item: string,
  chickenName: string,
  egg: Egg,
  handleMoreOptions: (eggId: string) => void,
};

const EggItem = ({
  item, egg, chickenName, handleMoreOptions,
}: Props) => (
  <ListItem>
    <Body style={styles.container}>
      <View style={styles.details}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{chickenName}</Text>
            <Text>{`${egg.weight || '-- '}g`}</Text>
          </View>
          {egg.damaged && (
            <View style={styles.badgeContainer}>
              <Badge warning>
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
          onPress={() => handleMoreOptions(item)}
        >
          <Icon active style={styles.moreIcon} name="more" />
        </Button>
      </View>
    </Body>
  </ListItem>
);

export default EggItem;
