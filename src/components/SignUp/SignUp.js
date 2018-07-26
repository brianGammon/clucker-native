import * as React from 'react';
import { Text, View, Button } from 'react-native';

type Props = {
  navigation: any,
};

export default class SignUp extends React.Component<Props> {
  static navigationOptions = {
    title: 'Sign Up',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign Up Screen</Text>
        <Button onPress={() => navigation.replace('SignIn')} title="Sign In" />
        <Button onPress={() => navigation.navigate('ResetPassword')} title="Reset Password" />
      </View>
    );
  }
}
