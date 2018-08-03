import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text, Button, View, Image,
} from 'react-native';
import { type Chicken, type Navigation } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  // chickenId: string,
  prevChickenId: string,
  nextChickenId: string,
  chicken: Chicken,
};

const ChickenRenderer = ({
  navigation,
  chicken,
  // chickenId,
  prevChickenId,
  nextChickenId,
}: Props) => (
  <View style={{ flex: 1 }}>
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
    <Button
      onPress={() => navigation.navigate('ChickenEditor')}
      title="Edit Chicken"
    />
  </View>
);

export default ChickenRenderer;
