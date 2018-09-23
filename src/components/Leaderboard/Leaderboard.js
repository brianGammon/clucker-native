/* @flow */
import React from 'react';
import {
  View, Text, ListItem, Left, Thumbnail, Right,
} from 'native-base';
import styles from './styles';
import Separator from '../Separator';
import { type FlockStats, type Chicken } from '../../types';

type Props = {
  stats: FlockStats,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const Leaderboard = ({ stats, chickens }: Props) => (
  <View>
    <Separator text="EGG LEADERBOARD" />
    {Object.keys(stats.eggsPerChicken || {}).map((key) => {
      const chicken = chickens[key] || { name: 'Unnamed Hen' };
      return (
        <ListItem key={key} style={styles.li}>
          <Left style={styles.flex}>
            <Thumbnail
              small
              square
              source={
                chicken.thumbnailUrl
                  ? { uri: chicken.thumbnailUrl }
                  : require('../../assets/default-profile-photo_thumb.png')
              }
            />
            <Text style={styles.leaderText}>{chicken.name}</Text>
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
