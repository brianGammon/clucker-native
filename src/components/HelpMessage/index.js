import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'native-base';
import styles from './styles';

type Props = {
  children: React.Component<Text>,
};

const HelpMessage = ({ children }: Props) => (
  <View padder style={styles.container}>
    <Image
      source={require('../../assets/chicken-sm.png')}
      style={styles.image}
    />
    <View style={styles.messageContainer}>{children}</View>
  </View>
);

export default HelpMessage;
