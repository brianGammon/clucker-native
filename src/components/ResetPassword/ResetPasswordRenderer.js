import * as React from 'react';
import {
  Button, View, Text, TextInput,
} from 'react-native';
import styles from './styles';

type Props = {
  navigation: any,
  email: string,
  error: string,
  successMessage: string,
  handleChangeText: (text: string) => void,
  handleSendPasswordResetEmail: () => void,
};

export default class ResetPassword extends React.Component<Props> {
  static navigationOptions = {
    title: 'Reset Password',
  };

  render() {
    const {
      navigation,
      email,
      error,
      successMessage,
      handleChangeText,
      handleSendPasswordResetEmail,
    } = this.props;
    return (
      <View style={styles.container}>
        {error && <Text>{error}</Text>}
        {successMessage && !error && <Text>{successMessage}</Text>}
        <Text>Reset your password</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            autoCapitalize="none"
            onChangeText={handleChangeText}
            autoFocus
          />
        </View>
        <Button onPress={handleSendPasswordResetEmail} title="Send Email" />
        <Button onPress={() => navigation.goBack()} title="Back To Sign In" />
      </View>
    );
  }
}
