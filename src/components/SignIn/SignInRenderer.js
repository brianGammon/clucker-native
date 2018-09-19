import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import { Text, Button, Form } from 'native-base';
import FormInput from '../FormInput';
import AuthContainer from '../Auth/AuthContainer';
import AuthExtraLink from '../Auth/AuthExtraLink';

type Props = {
  inputRefs: {
    [id: string]: any,
  },
  focusNext: (field: string) => void,
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
  inputRefs,
  focusNext,
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
            render={fieldProps => <FormInput {...fieldProps} />}
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
            render={fieldProps => <FormInput {...fieldProps} />}
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
