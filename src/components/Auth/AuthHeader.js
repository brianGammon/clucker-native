import React from 'react';
import { View, Text, H1 } from 'native-base';
import { Image } from 'react-native';
import styles from './styles';

const AuthHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      style={styles.headerImage}
      source={require('../../assets/chicken-sm.png')}
    />
    <View style={styles.headerCopy}>
      <H1 style={styles.headerTitle}>Clucker</H1>
      <Text style={styles.headerSubTitle}>
        Your Backyard Chicken Egg Tracker
      </Text>
    </View>
  </View>
);

export default AuthHeader;
