import * as React from 'react';
import { connect } from 'react-redux';
import SignInRenderer from './SignInRenderer';
import { signInRequested } from '../../redux/actions';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  error: string,
  signIn: (email: string, password: string) => void,
  clearError: () => void,
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

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
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
    const { navigation, error } = this.props;
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

const mapStateToProps = ({ auth: { errors } }) => ({
  error: errors.signIn,
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signInRequested(email, password)),
  clearError: () => dispatch({ type: actionTypes.CLEAR_AUTH_ERROR }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
