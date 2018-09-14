/* @flow */
import React from 'react';
import { Text } from 'native-base';
import styles from './styles';

type Props = {
  text: string,
  style?: {} | null,
};

const CommonLabel = ({ text, style }: Props) => (
  <Text style={[styles.label, style]}>{text && text.toUpperCase()}</Text>
);

CommonLabel.defaultProps = {
  style: null,
};

export default CommonLabel;
