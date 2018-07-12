import React from 'react';
import { Text, Button, View } from 'react-native';

export interface Props {
  navigation: any;
}

export default class Flock extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Flock Screen</Text>
        <Button onPress={() => navigation.navigate('ChickenEditor')} title="Add a Chicken" />
        <Button onPress={() => navigation.navigate('Chicken')} title="Chicken Profile" />
      </View>
    );
  }
}
