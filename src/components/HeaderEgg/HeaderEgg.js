import * as React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {
  navigation: any,
};

export default ({ navigation }: { navigation: Props.navigation }) => {
  const chickenId = navigation.getParam('chickenId', null);
  const options = {};
  if (chickenId) {
    options.chickenId = chickenId;
    options.eggId = 'eggID1';
    options.date = '2018-10-19';
  }
  return (
    <Text
      onPress={() => navigation.navigate('EggModal', options)}
      style={styles.text}
    >
      +
      <Ionicons name="ios-egg" color="grey" style={styles.icon} />
    </Text>
  );
};
