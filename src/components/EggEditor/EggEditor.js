import * as React from 'react';
import { Text, View, Button } from 'react-native';

type Props = {
  navigation: any,
};

export default class EggEditor extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const chickenId = navigation.getParam('chickenId', null);
    const eggId = navigation.getParam('eggId', null);
    const defaultDate = navigation.getParam('date', null);
    let message = `${eggId ? 'Edit' : 'Add'} Egg`;
    if (chickenId) {
      message += ` for chicken ID: ${chickenId}`;
    }
    if (defaultDate) {
      message += ` for date: ${defaultDate}`;
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>{message}</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }
}
