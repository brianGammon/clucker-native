import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import {
  Text, Button, Form, Spinner,
} from 'native-base';
import FormInput from '../FormInput';
import AuthContainer from '../Auth/AuthContainer';
import AuthExtraLink from '../Auth/AuthExtraLink';

type Props = {
  inputRefs: {
    [id: string]: any,
  },
  navigation: any,
  error: string,
  inProgress: boolean,
  loginForm: any,
  handleSubmit: any,
  focusNext: (field: string) => void,
};

const SignUpRenderer = ({
  navigation,
  error,
  loginForm,
  handleSubmit,
  inputRefs,
  focusNext,
  inProgress,
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
      strict={false}
      render={({ invalid }) => (
        <Form>
          <FieldControl
            name="email"
            render={formProps => <FormInput {...formProps} />}
            meta={{
              label: 'Email',
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              inputRefs,
              onSubmitEditing: () => focusNext('Password'),
              returnKeyType: 'next',
              blurOnSubmit: false,
            }}
          />

          <FieldControl
            name="password"
            render={formProps => <FormInput {...formProps} />}
            meta={{
              label: 'Password',
              autoCapitalize: 'none',
              secureTextEntry: true,
              inputRefs,
              returnKeyType: 'done',
              blurOnSubmit: true,
            }}
          />

          <Button
            style={{ marginTop: 10 }}
            block
            onPress={handleSubmit}
            disabled={invalid || inProgress}
          >
            {!inProgress && <Text>Submit</Text>}
            {inProgress && <Spinner size="small" color="white" />}
          </Button>
        </Form>
      )}
    />
  </AuthContainer>
);

export default SignUpRenderer;
