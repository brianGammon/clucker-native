import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import { Text, Button, Form } from 'native-base';
import FormInput from '../FormInput';
import AuthContainer from '../Auth/AuthContainer';
import AuthExtraLink from '../Auth/AuthExtraLink';

type Props = {
  navigation: any,
  error: string,
  loginForm: any,
  handleSubmit: any,
};

const SignInRenderer = ({
  navigation,
  error,
  loginForm,
  handleSubmit,
}: Props) => (
  <AuthContainer
    title="Sign In"
    error={error}
    extraLinks={[
      <AuthExtraLink
        key={0}
        message="No account yet?"
        buttonText="Sign Up"
        handlePress={() => navigation.replace('SignUp')}
      />,
      <AuthExtraLink
        key={1}
        message="Forgot your password?"
        buttonText="Reset"
        handlePress={() => navigation.navigate('ResetPassword')}
      />,
    ]}
  >
    <FieldGroup
      control={loginForm}
      render={({ invalid }) => (
        <Form>
          <FieldControl
            name="email"
            render={FormInput}
            meta={{
              label: 'Email Addess',
              autoCapitalize: 'none',
              keyboardType: 'email-address',
            }}
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
          <Button
            style={{ marginTop: 10 }}
            block
            onPress={handleSubmit}
            disabled={invalid}
          >
            <Text>Submit</Text>
          </Button>
        </Form>
      )}
    />
  </AuthContainer>
);

export default SignInRenderer;
