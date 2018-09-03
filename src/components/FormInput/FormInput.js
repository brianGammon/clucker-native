/* @flow */
import React from 'react';
import {
  View, Input, Item, Icon, Text,
} from 'native-base';
import errorMapper from '../../utils/errorMapper';
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
    multiline: boolean,
    maxLength: number,
    numberOfLines: number,
    keyboardType: any,
  },
};

const FormInput = ({
  handler, touched, meta, errors,
}: Props) => {
  const error = errorMapper(errors, meta);
  return (
    <View style={styles.container}>
      <Item error={touched && error !== null}>
        <Input
          keyboardType={meta.keyboardType || null}
          maxLength={meta.maxLength || null}
          numberOfLines={meta.numberOfLines || null}
          multiline={meta.multiline}
          placeholder={meta.label}
          autoCapitalize={meta.autoCapitalize}
          secureTextEntry={meta.secureTextEntry}
          {...handler()}
        />
        {touched && error !== null && <Icon name="alert" />}
      </Item>
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{touched && error}</Text>
      </View>
    </View>
  );
};

export default FormInput;
