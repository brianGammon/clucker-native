import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import { View, Button, Text } from 'react-native';
import FormInput from '../FormInput';
import styles from './styles';

type Props = {
  navigation: any,
  form: any,
  error: string,
  successMessage: string,
  handleSubmit: () => void,
};

const ResetPasswordRenderer = ({
  navigation,
  form,
  error,
  successMessage,
  handleSubmit,
}: Props) => (
  // <View style={styles.container}>
  //   {error && <Text>{error}</Text>}
  //   {successMessage && !error && <Text>{successMessage}</Text>}
  //   <Text>Reset your password</Text>
  //   <View style={styles.formGroup}>
  //     <Text style={styles.label}>Email:</Text>
  //     <TextInput
  //       style={styles.input}
  //       value={email}
  //       autoCapitalize="none"
  //       onChangeText={handleChangeText}
  //       autoFocus
  //     />
  //   </View>
  //   <Button onPress={handleSendPasswordResetEmail} title="Send Email" />
  //   <Button onPress={() => navigation.goBack()} title="Back To Sign In" />
  // </View>
  <View style={styles.container}>
    <View style={styles.signInContainer}>
      <View>
        <Text style={styles.title}>Clucker</Text>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {successMessage
        && !error && <Text style={styles.success}>{successMessage}</Text>}
      <FieldGroup
        control={form}
        render={({ invalid }) => (
          <View style={styles.formContainer}>
            <FieldControl
              name="email"
              render={FormInput}
              meta={{ label: 'Email Addess', autoCapitalize: 'none' }}
            />

            <Button
              disabled={invalid}
              onPress={handleSubmit}
              title="Send Email"
            />
            <Button
              onPress={() => navigation.goBack()}
              title="Back To Sign In"
            />
          </View>
        )}
      />
    </View>
  </View>
);

export default ResetPasswordRenderer;
