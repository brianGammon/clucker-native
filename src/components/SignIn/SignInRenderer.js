import * as React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';

import styles from './styles';

type Props = {
  navigation: any,
  email: string,
  password: string,
  error: string,
  handleSignIn: () => void,
  handleChangeText: (type: string, text: string) => void,
};

const SignInRenderer = ({
  email,
  password,
  error,
  navigation,
  handleChangeText,
  handleSignIn,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>Sign In</Text>
    {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
    <TextInput
      style={styles.textInput}
      autoCapitalize="none"
      placeholder="email"
      onChangeText={text => handleChangeText('email', text)}
      value={email}
    />
    <TextInput
      secureTextEntry
      style={styles.textInput}
      autoCapitalize="none"
      placeholder="Password"
      onChangeText={text => handleChangeText('password', text)}
      value={password}
    />
    <Button title="Submit" onPress={handleSignIn} />
    <Button
      title="Don't have an account? Sign Up"
      onPress={() => navigation.replace('SignUp')}
    />
    <Button
      onPress={() => navigation.navigate('ResetPassword')}
      title="Reset Password"
    />
  </View>
);

export default SignInRenderer;
