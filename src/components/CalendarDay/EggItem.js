/* @flow */
import React from 'react';
import {
  View, Text, ListItem, Body, Button, Icon, Badge,
} from 'native-base';
import { type Egg } from '../../types';
import styles from './styles';

type Props = {
  item: string,
  eggs: {
    [eggId: string]: Egg,
  },
  handleMoreOptions: (eggId: string) => void,
};

const EggItem = ({ item, eggs, handleMoreOptions }: Props) => (
  <ListItem>
    <Body style={styles.container}>
      <View style={styles.details}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{eggs[item].chickenName}</Text>
            <Text>{`${eggs[item].weight || '-- '}g`}</Text>
          </View>
          {eggs[item].damaged && (
            <View style={styles.badgeContainer}>
              <Badge warning>
                <Text style={styles.badgeText}>Damaged</Text>
              </Badge>
            </View>
          )}
        </View>
        {!!eggs[item].notes
          && eggs[item].notes !== '' && (
            <View style={styles.notesContainer}>
              <Icon name="attach" />
              <Text style={styles.eggNote}>{eggs[item].notes}</Text>
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
