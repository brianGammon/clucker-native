import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default ({ navigation }) => (
  <Ionicons onPress={() => navigation.toggleDrawer()} name="ios-person" style={styles.icon} />
);
