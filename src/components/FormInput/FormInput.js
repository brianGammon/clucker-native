/* @flow */
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

type Props = {
  handler: () => void,
  touched: boolean,
  errors: {
    [errorKey: string]: any,
  } | null,
  meta: {
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
    mustMatchLabel: string,
    label: string,
    secureTextEntry: boolean,
  },
};

const errorMapper = (errors, meta) => {
  const errorMap = {
    email: 'Enter a valid email address.',
    required: `${meta.label} is required.`,
    minLength:
      errors && errors.minLength
        ? `Must be at least ${errors.minLength.requiredLength} characters.`
        : 'Not long enough.',
    mustMatch: `Must match ${meta.mustMatchLabel || 'the other field'}.`,
  };
  if (errors) {
    const result = Object.keys(errorMap).filter(k => k in errors);
    return errorMap[result[0]];
  }

  return null;
};

const FormInput = ({
  handler, touched, meta, errors,
}: Props) => {
  const error = errorMapper(errors, meta);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={`Enter ${meta.label}`}
        autoCapitalize={meta.autoCapitalize}
        secureTextEntry={meta.secureTextEntry}
        {...handler()}
      />
      <View style={{ height: 20 }}>
        <Text style={styles.error}>{touched && error}</Text>
      </View>
    </View>
  );
};

export default FormInput;
