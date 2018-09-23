import React from 'react';
import { Text, Separator as NBSeparator } from 'native-base';
import styles from './styles';

type Props = {
  text: string,
};

const Separator = ({ text }: Props) => (
  <NBSeparator style={styles.separator}>
    <Text style={styles.separatorLabel}>{text}</Text>
  </NBSeparator>
);

export default Separator;
