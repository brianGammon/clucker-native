/* @flow */
import React from 'react';
import {
  View, Text, ListItem, Left, Thumbnail, Right,
} from 'native-base';
import styles from './styles';
import Separator from '../Separator';
import { type FlockStats, type Chicken } from '../../types';
import { UNNAMED_HEN_LABEL } from '../../constants';

type Props = {
  stats: FlockStats,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const Leaderboard = ({ stats, chickens }: Props) => {
  const keys = Object.keys(stats.eggsPerChicken || {});
  if (keys.length === 0) {
    return null;
  }

  return (
    <View>
      <Separator text="LEADERBOARD" />
      {keys.map((key) => {
        const chicken = chickens[key] || { name: UNNAMED_HEN_LABEL };
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
};

export default Leaderboard;
