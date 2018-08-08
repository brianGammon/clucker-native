import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text, Button, View, Image, ScrollView,
} from 'react-native';
import { type Chicken, type Navigation, ChickenStats } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  chickenId: string,
  prevChickenId: string,
  nextChickenId: string,
  chicken: Chicken,
  stats: ChickenStats,
};

const ChickenRenderer = ({
  navigation,
  chicken,
  stats,
  chickenId,
  prevChickenId,
  nextChickenId,
}: Props) => (
  <ScrollView>
    <Button
      onPress={() => navigation.navigate('ChickenEditor', { chickenId })}
      title="Edit Chicken"
    />
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Ionicons
        onPress={() => (prevChickenId
          ? navigation.replace('Chicken', { chickenId: prevChickenId })
          : null)
        }
        name="ios-arrow-back"
        color={prevChickenId ? 'grey' : 'lightgrey'}
        style={styles.iconLeft}
      />
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: chicken.photoUrl }}
      />
      <Ionicons
        onPress={() => (nextChickenId
          ? navigation.replace('Chicken', { chickenId: nextChickenId })
          : null)
        }
        name="ios-arrow-forward"
        color={nextChickenId ? 'grey' : 'lightgrey'}
        style={styles.iconRight}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
      }}
    >
      <View>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{chicken.name}</Text>
        <Text style={[styles.label, { paddingTop: 10 }]}>Hatched On:</Text>
        <Text style={styles.text}>{chicken.hatched}</Text>
      </View>
      <View>
        <Text style={styles.label}>Breed:</Text>
        <Text style={styles.text}>{chicken.breed}</Text>
      </View>
    </View>
    {stats
      && stats.total > 0 && (
        <View>
          <Text style={styles.label}>Total Eggs:</Text>
          <Text style={styles.text}>{stats.total}</Text>
          <Text style={[styles.label, { paddingTop: 10 }]}>Heaviest Egg:</Text>
          <Text style={styles.text}>
            {stats.heaviest && stats.heaviest.weight}
          </Text>
          <Text style={styles.text}>
            {stats.heaviest && stats.heaviest.date}
          </Text>
          <Text style={[styles.label, { paddingTop: 10 }]}>
            Longest Streak:
          </Text>
          <Text style={styles.text}>{stats.longestStreak}</Text>
          <Text style={[styles.label, { paddingTop: 10 }]}>Last 7 Days:</Text>
          <Text style={styles.text}>
            {JSON.stringify(stats.lastSevenDays, null, 2)}
          </Text>
        </View>
    )}
  </ScrollView>
);

export default ChickenRenderer;
