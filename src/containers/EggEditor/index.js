import React from 'react';
import { Text, View, Button } from 'react-native';

export interface Props {
  navigation: any;
}

export default class EggEditor extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Add or Edit an Egg Here</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }
}
