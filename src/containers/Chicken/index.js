import * as React from 'react';
import { Text, Button, View } from 'react-native';

type Props = {
  navigation: any;
}

export default class Chicken extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('chickenId', 'NO-ID');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>{`Chicken Profile for chicken ID: ${id}`}</Text>
        <Button onPress={() => navigation.navigate('ChickenEditor')} title="Edit Chicken" />
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
