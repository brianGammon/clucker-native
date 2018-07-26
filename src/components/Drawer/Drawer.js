import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import firebase from 'react-native-firebase';

type Props = {
  navigation: any,
};

export default class Drawer extends React.Component<Props> {
  signOutAsync = async () => {
    const { navigation } = this.props;
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