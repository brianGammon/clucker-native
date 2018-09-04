import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import { Button, Text, Form } from 'native-base';
import FormInput from '../FormInput';
import AuthContainer from '../Auth/AuthContainer';
import AuthExtraLink from '../Auth/AuthExtraLink';

type Props = {
  navigation: any,
  error: string,
  loginForm: any,
  handleSubmit: any,
};

const SignUpRenderer = ({
  navigation,
  error,
  loginForm,
  handleSubmit,
}: Props) => (
  <AuthContainer
    title="Sign Up"
    error={error}
    extraLinks={[
      <AuthExtraLink
        key={0}
        message="Already have an account?"
        buttonText="Sign In"
        handlePress={() => navigation.replace('SignIn')}
      />,
    ]}
  >
    <FieldGroup
      control={loginForm}
      render={({ invalid }) => (
        <Form>
          <FieldControl
            name="email"
            render={formProps => <FormInput {...formProps} />}
            meta={{
              label: 'Email',
              autoCapitalize: 'none',
              keyboardType: 'email-address',
            }}
          />

          <FieldControl
            name="password"
            render={formProps => <FormInput {...formProps} />}
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

export default SignUpRenderer;
