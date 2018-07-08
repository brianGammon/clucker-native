import React from 'react';
import { AsyncStorage, SafeAreaView, Text } from 'react-native';

export interface Props {
  navigate: any;
}
export default class Drawer extends React.Component<Props> {
  signOutAsync = async () => {
    await AsyncStorage.clear();
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView>
        <Text onPress={() => navigation.navigate('Settings')}>Flock</Text>
        <Text onPress={this.signOutAsync}>Sign Out</Text>
      </SafeAreaView>
    );
  }
}
