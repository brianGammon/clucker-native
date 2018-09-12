/* @flow */
import * as React from 'react';
// $FlowFixMe
import firebase from 'react-native-firebase';
import Loading from '../Loading';

type Props = {
  navigation: any,
};

export default class Preload extends React.Component<Props> {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate(firebase.auth().currentUser ? 'SignedIn' : 'SignedOut');
  }

  render() {
    return <Loading message="Checking Status..." />;
  }
}
