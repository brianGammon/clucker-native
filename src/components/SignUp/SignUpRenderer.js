import * as React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';

import styles from './styles';

type Props = {
  navigation: any,
  email: string,
  password: string,
  confirmPassword: string,
  error: string,
  handleSignUp: () => void,
  handleChangeText: (type: string, text: string) => void,
};

const SignUpRenderer = ({
  email,
  password,
  confirmPassword,
  error,
  navigation,
  handleChangeText,
  handleSignUp,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>Sign Up</Text>
    {error && <Text style={{ color: 'red' }}>{error}</Text>}
    <View style={styles.formGroup}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={text => handleChangeText('email', text)}
        value={email}
      />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
        onChangeText={text => handleChangeText('password', text)}
        value={password}
      />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
        onChangeText={text => handleChangeText('confirmPassword', text)}
        value={confirmPassword}
      />
    </View>
    <Button title="Submit" onPress={handleSignUp} />
    <Button
      title="Already have an account? Sign In"
      onPress={() => navigation.replace('SignIn')}
    />
  </View>
);

export default SignUpRenderer;
