/* @flow */
import React from 'react';
import { View, Text, Button } from 'native-base';
import styles from './styles';

type Props = {
  message: string,
  buttonText: string,
  handlePress: () => void,
};

const AuthExtraLink = ({ message, buttonText, handlePress }: Props) => (
  <View style={styles.extraLinks}>
    <Text style={styles.bodyText}>{message}</Text>
    <Button transparent style={{ alignSelf: 'center' }} onPress={handlePress}>
      <Text>{buttonText}</Text>
    </Button>
  </View>
);

export default AuthExtraLink;
