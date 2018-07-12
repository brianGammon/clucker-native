import React from 'react';
import firebase from 'react-native-firebase';
import Loading from '../../components/Loading';

export interface Props {
  navigation: any;
}

export interface State {}

export default class Preload extends React.Component<Props, State> {
  // Fetch the token from storage then navigate to our appropriate place
  async componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate(firebase.auth().currentUser ? 'SignedIn' : 'SignedOut');
  }

  // Render any loading content that you like here
  render() {
    return <Loading message="Preloading..." />;
  }
}
