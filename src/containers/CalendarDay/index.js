/* @flow */
import React from 'react';
import { Text, Button, View } from 'react-native';

export interface Props {
  navigation: any;
}

export default class CalendarDay extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Todays Eggs</Text>
        <Button onPress={() => navigation.goBack()} title="Back to Month" />
      </View>
    );
  }
}
