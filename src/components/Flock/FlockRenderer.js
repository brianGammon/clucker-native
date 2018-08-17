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
  isFlockOwner: boolean,
};

const FlockRenderer = ({
  navigation,
  chickens,
  flock,
  isFlockOwner,
}: Props) => (
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
              source={
                chickens[item].thumbnailUrl
                  ? { uri: chickens[item].thumbnailUrl }
                  : require('../../assets/default-profile-photo_thumb.png')
              }
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text>Name: {chickens[item].name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    {isFlockOwner && (
      <Button
        onPress={() => navigation.navigate('ChickenEditor')}
        title="Add a Chicken"
      />
    )}
  </View>
);

export default FlockRenderer;
