/* @flow */
import React from 'react';
import {
  View,
  Text,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';
import { type Chicken, type Navigation } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  item: string,
  chickens: {
    [chickenId: string]: Chicken,
  },
  topProducer: string,
};

const FlockItem = ({
  item, chickens, navigation, topProducer,
}: Props) => (
  <ListItem
    onPress={() => navigation.navigate('Chicken', { chickenId: item })}
    thumbnail
  >
    <Left>
      <Thumbnail
        square
        source={
          chickens[item].thumbnailUrl
            ? { uri: chickens[item].thumbnailUrl }
            : require('../../assets/default-profile-photo_thumb.png')
        }
      />
    </Left>
    <Body>
      <View style={styles.header}>
        <View style={styles.bodyCell}>
          <Text>{chickens[item].name}</Text>
          <Text note numberOfLines={1}>
            {chickens[item].breed}
          </Text>
        </View>
        {topProducer
          && topProducer === item && (
            <View style={[styles.bodyCell, styles.trophyCell]}>
              <Icon
                style={styles.trophyIcon}
                type="FontAwesome"
                name="trophy"
              />
              <Text style={styles.trophyCellText}>Top Producer</Text>
            </View>
        )}
      </View>
    </Body>
    <Right>
      <Icon name="arrow-forward" />
    </Right>
  </ListItem>
);

export default FlockItem;
