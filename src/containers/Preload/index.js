/* @flow */
import * as React from 'react';
import firebase from 'react-native-firebase';
import Loading from '../../components/Loading';

type Props = {
  navigation: any;
}

type State = {}

export default class Preload extends React.Component<Props, State> {
  async componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate(firebase.auth().currentUser ? 'SignedIn' : 'SignedOut');
  }

  render() {
    return <Loading message="Preloading..." />;
  }
}
