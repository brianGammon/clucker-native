import React from 'react';
import {
  Text,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { type Chicken, type Navigation, type Flock } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  flock: Flock,
};

const FlockRenderer = ({ navigation, chickens, flock }: Props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Flock Name: {flock && flock.name}</Text>
    <FlatList
      style={{ width: '100%' }}
      data={Object.keys(chickens || {})}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            padding: 10,
          }}
          onPress={() => navigation.navigate('Chicken', { chickenId: item })}
        >
          <View>
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: chickens[item].thumbnailUrl }}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text>Name: {chickens[item].name}</Text>
            <Text>Breed: {chickens[item].breed}</Text>
            <Text>Hatched On: {chickens[item].hatched}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    <Button
      onPress={() => navigation.navigate('ChickenEditor')}
      title="Add a Chicken"
    />
    <Button
      onPress={() => navigation.navigate('Chicken')}
      title="Chicken Profile"
    />
  </View>
);

export default FlockRenderer;
