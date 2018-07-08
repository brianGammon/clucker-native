import React from 'react';
import {
  Text, View, Button, AsyncStorage,
} from 'react-native';

export interface Props {
  navigation: any;
}

export default class SignIn extends React.Component<Props> {
  static navigationOptions = {
    title: 'Sign In',
  };

  constructor() {
    super();
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  async handleSignIn() {
    const { navigation } = this.props;
    await AsyncStorage.setItem('userToken', 'TestUser');
    navigation.navigate('App');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign In Screen</Text>
        <Button onPress={this.handleSignIn} title="Be Signed In" />
        <Button onPress={() => navigation.navigate('ResetPassword')} title="Reset Password" />
        <Button onPress={() => navigation.replace('SignUp')} title="Sign Up" />
        <Button onPress={() => navigation.navigate('ResetPassword')} title="Reset Password" />
      </View>
    );
  }
}
