import React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles';

export interface Props {
  navigation: any;
}

export interface State {
  email: string;
  password: string;
  errorMessage: string;
}

export default class SignIn extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Sign In',
  };

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  async handleSignIn() {
    const { email, password } = this.state;
    const { navigation } = this.props;
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('App'))
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    const { navigation } = this.props;
    const { errorMessage, password, email } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sign In</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={emailText => this.setState({ email: emailText })}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={passwordText => this.setState({ password: passwordText })}
          value={password}
        />
        <Button title="Submit" onPress={this.handleSignIn} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.replace('SignUp')}
        />
        <Button onPress={() => navigation.navigate('ResetPassword')} title="Reset Password" />
      </View>
    );
  }
}
