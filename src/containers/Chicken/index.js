import React from 'react';
import { Text, Button, View } from 'react-native';

export default class Chicken extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Chicken Profile</Text>
        <Button onPress={() => navigation.navigate('ChickenEditor')} title="Edit Chicken" />
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
