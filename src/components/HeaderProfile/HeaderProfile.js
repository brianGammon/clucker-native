import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {
  navigation: any,
};

export default ({ navigation }: { navigation: Props.navigation }) => (
  <Ionicons onPress={() => navigation.toggleDrawer()} name="ios-person" style={styles.icon} />
);
