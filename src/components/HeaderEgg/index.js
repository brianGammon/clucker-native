import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {
  navigation: any,
};

export default ({ navigation }: { navigation: Props.navigation }) => (
  <Text onPress={() => navigation.navigate('EggModal')} style={styles.text}>
    +
    <Ionicons name="ios-egg" color="grey" style={styles.icon} />
  </Text>
);
