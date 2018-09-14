/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  Button,
  ListItem,
  Left,
  Right,
  Radio,
  List,
  Icon,
} from 'native-base';
import { type Flock } from '../../types';
import CommonLabel from '../CommonLabel';
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
  <View style={styles.container}>
    <CommonLabel text="Active Flock" />
    <View style={styles.helpTextContainer}>
      <Text style={styles.helpText}>
        Choose which flock is currently active:
      </Text>
    </View>

    <List>
      {Object.keys(flocks).map((key) => {
        const isOwner = userId === flocks[key].ownedBy;
        const currentlySelected = key === currentFlockId;
        return (
          <ListItem
            style={styles.listItem}
            selected={currentlySelected}
            key={key}
            onPress={!currentlySelected ? () => handleSelectFlock(key) : null}
          >
            <Left style={styles.listItemLeft}>
              <Radio
                onPress={
                  !currentlySelected ? () => handleSelectFlock(key) : null
                }
                selected={currentlySelected}
              />
              <Text style={styles.listItemLeftText}>{flocks[key].name}</Text>
            </Left>
            <Right>
              <Button
                dark
                small
                transparent
                onPress={() => (isOwner ? handleDeleteFlock(key) : handleUnlinkFlock(key))
                }
              >
                <Icon name={isOwner ? 'trash' : 'close'} />
              </Button>
            </Right>
          </ListItem>
        );
      })}
    </List>
  </View>
);
export default FlockSelectorRenderer;
