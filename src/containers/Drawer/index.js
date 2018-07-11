import React from 'react';
import { AsyncStorage, SafeAreaView, Text } from 'react-native';
import firebase from 'react-native-firebase';

export interface Props {
  navigate: any;
}
export default class Drawer extends React.Component<Props> {
  signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate('SignedOut'));
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
