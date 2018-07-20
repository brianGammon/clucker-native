/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import {
  Text, Button, View, FlatList, TouchableOpacity, Image,
} from 'react-native';
import { type Chicken, type Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
};

class Flock extends React.Component<Props> {
  render() {
    const { navigation, chickens } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              onPress={() => navigation.navigate('Chicken')}
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
        <Button onPress={() => navigation.navigate('ChickenEditor')} title="Add a Chicken" />
        <Button onPress={() => navigation.navigate('Chicken')} title="Chicken Profile" />
      </View>
    );
  }
}

const mapStateToProps = ({ chickens: { items } }) => ({ chickens: items });
export default connect(mapStateToProps)(Flock);
