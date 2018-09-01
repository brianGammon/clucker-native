import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import {
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from 'react-native';
import FormInput from '../FormInput';
import styles from './styles';

type Props = {
  navigation: any,
  error: string,
  loginForm: any,
  handleReset: any,
  handleSubmit: any,
};

const SignUpRenderer = ({
  navigation,
  error,
  loginForm,
  handleReset,
  handleSubmit,
}: Props) => (
  <ImageBackground
    source={require('../../assets/rays.jpg')}
    style={{ width: '100%', height: '100%' }}
  >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <View style={styles.signUpContainer}>
        <View>
          <Text style={styles.title}>Clucker</Text>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <FieldGroup
          control={loginForm}
          render={({ invalid }) => (
            <View style={styles.formContainer}>
              <FieldControl
                name="email"
                render={FormInput}
                meta={{ label: 'Email Addess', autoCapitalize: 'none' }}
              />

              <FieldControl
                name="password"
                render={FormInput}
                meta={{
                  label: 'Password',
                  autoCapitalize: 'none',
                  secureTextEntry: true,
                }}
              />

              <FieldControl
                name="confirmPassword"
                render={FormInput}
                meta={{
                  label: 'Confirm Password',
                  autoCapitalize: 'none',
                  secureTextEntry: true,
                  mustMatchLabel: 'Password',
                }}
              />

              <Button onPress={handleReset} title="Reset" />
              <Button
                onPress={handleSubmit}
                disabled={invalid}
                title="Submit"
              />
              <Button
                title="Already have an account? Sign In"
                onPress={() => navigation.replace('SignIn')}
              />
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  </ImageBackground>
);

export default SignUpRenderer;
