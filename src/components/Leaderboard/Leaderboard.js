/* @flow */
import React from 'react';
import {
  View,
  Text,
  Separator,
  ListItem,
  Left,
  Thumbnail,
  Right,
} from 'native-base';
import styles from './styles';
import { type FlockStats, type Chicken } from '../../types';

type Props = {
  stats: FlockStats,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const Leaderboard = ({ stats, chickens }: Props) => (
  <View>
    <Separator>
      <Text>LEADERBOARD</Text>
    </Separator>
    {Object.keys(stats.eggsPerChicken).map((key) => {
      if (!chickens[key]) {
        return null;
      }
      return (
        <ListItem key={key} style={styles.li}>
          <Left style={styles.flex}>
            <Thumbnail
              small
              square
              source={
                chickens[key].thumbnailUrl
                  ? { uri: chickens[key].thumbnailUrl }
                  : require('../../assets/default-profile-photo_thumb.png')
              }
            />
            <Text style={styles.leaderText}>
              {chickens[key] ? chickens[key].name : 'Unnamed Hen'}
            </Text>
          </Left>

          <Right>
            <Text>{stats.eggsPerChicken[key]}</Text>
          </Right>
        </ListItem>
      );
    })}
  </View>
);

export default Leaderboard;
