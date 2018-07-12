/* @flow */
import React from 'react';
import { Linking, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

import Loading from './components/Loading';
import RootNavigator from './navigation/RootNavigator';

export interface Props {}
export interface State {
  loading: boolean;
}

const handleOpenURL = ({ url }) => {
  // TODO: move to redux state instead of AsyncStorage
  AsyncStorage.setItem('initialUrl', url);
};

export default class App extends React.Component<Props, State> {
  authUnsubscriber = null;

  state = { loading: true };

  componentDidMount() {
    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then(url => url && handleOpenURL({ url }));

    this.authUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loading: false });
      if (user) {
        console.log('Logged in, start listening');
      } else {
        console.log('Logged out, stop listening');
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', handleOpenURL);

    if (this.authUnsubscriber) {
      this.authUnsubscriber();
    }
  }

  render() {
    const { loading } = this.state;
    return loading ? <Loading /> : <RootNavigator />;
  }
}
