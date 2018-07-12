import React from 'react';
import { Button, View } from 'react-native';

interface Props {
  navigation: any;
}

export default class ResetPassword extends React.Component<Props> {
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
