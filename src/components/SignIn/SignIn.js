import * as React from 'react';
import { connect } from 'react-redux';
import SignInRenderer from './SignInRenderer';
import { signInRequested } from '../../redux/actions';
import { type User } from '../../types';

type Props = {
  navigation: any,
  authState: {
    inProgress: boolean,
    error: string,
    user: User,
  },
  signIn: (email: string, password: string) => void,
};

type State = {
  email: string,
  password: string,
};

class SignIn extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Sign In',
  };

  state = {
    email: '',
    password: '',
  };

  componentDidUpdate() {
    const {
      authState: { user },
      navigation,
    } = this.props;
    if (user) {
      navigation.navigate('SignedIn');
    }
  }

  handleSignIn = async () => {
    const { email, password } = this.state;
    const { signIn } = this.props;
    signIn(email, password);
  };

  handleChangeText = (field: string, text: string) => {
    this.setState({ [field]: text });
  };

  render() {
    const {
      navigation,
      authState: { error },
    } = this.props;
    const { email, password } = this.state;
    return (
      <SignInRenderer
        email={email}
        password={password}
        error={error}
        navigation={navigation}
        handleSignIn={this.handleSignIn}
        handleChangeText={this.handleChangeText}
      />
    );
  }
}

const mapStateToProps = ({ authState }) => ({
  authState,
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signInRequested(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
