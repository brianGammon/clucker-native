/* @flow */
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { type User } from '../../types';

type Props = {
  navigation: any,
  user: User,
};

class Preload extends React.Component<Props> {
  async componentDidMount() {
    const { navigation, user } = this.props;
    const hasSignedIn = await AsyncStorage.getItem('hasSignedIn');
    const SignedOutRoute = hasSignedIn ? 'SignIn' : 'SignUp';
    navigation.navigate(user ? 'SignedIn' : SignedOutRoute);
  }

  render() {
    return <Loading message="Checking Status..." />;
  }
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(Preload);
