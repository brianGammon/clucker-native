import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import {
  View, Button, TextInput, Text,
} from 'react-native';

import styles from './styles';

type FormProps = {
  handler: () => void,
  touched: boolean,
  hasError: boolean,
  meta: any,
};

const FormInput = ({
  handler, touched, hasError, meta,
}: FormProps) => (
  <View style={{ width: '90%' }}>
    <TextInput
      style={styles.textInput}
      placeholder={`Enter ${meta.label}`}
      autoCapitalize={meta.autoCapitalize}
      secureTextEntry={meta.secureTextEntry}
      {...handler()}
    />
    <View>
      <Text style={styles.error}>
        {touched && hasError('required') && `${meta.label} is required`}
      </Text>
    </View>
  </View>
);

type Props = {
  navigation: any,
  error: string,
  loginForm: any,
  handleReset: any,
  handleSubmit: any,
};

const SignInRenderer = ({
  navigation,
  error,
  loginForm,
  handleReset,
  handleSubmit,
}: Props) => (
  <View style={styles.container}>
    {error && <Text style={{ color: 'red' }}>{error}</Text>}
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

          <Button onPress={handleReset} title="Reset" />
          <Button onPress={handleSubmit} disabled={invalid} title="Submit" />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.replace('SignUp')}
          />
          <Button
            onPress={() => navigation.navigate('ResetPassword')}
            title="Reset Password"
          />
        </View>
      )}
    />
  </View>
);

export default SignInRenderer;
