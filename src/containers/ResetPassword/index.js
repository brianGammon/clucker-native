import React from 'react';
import { Button, View } from 'react-native';

export default class ResetPassword extends React.Component {
  static navigationOptions = {
    title: 'Reset Password',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
