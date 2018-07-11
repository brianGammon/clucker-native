import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './styles';

export interface Props {
  navigation: any;
}

export interface State {}

export default class Preload extends React.Component<Props, State> {
  authUnsubscriber = null;

  // Fetch the token from storage then navigate to our appropriate place
  async componentDidMount() {
    const { navigation } = this.props;

    this.authUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'SignedIn' : 'SignedOut');
    });
  }

  componentWillUnmount() {
    if (this.authUnsubscriber) {
      this.authUnsubscriber();
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
