import * as React from 'react';
import { connect } from 'react-redux';
import SignUpRenderer from './SignUpRenderer';
import { signUpRequested } from '../../redux/actions';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  error: string,
  signUp: (email: string, password: string) => void,
  clearError: () => void,
};

type State = {
  email: string,
  password: string,
  confirmPassword: string,
};

class SignUp extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Sign Up',
  };

  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  handleSignUp = async () => {
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp(email, password);
  };

  handleChangeText = (field: string, text: string) => {
    this.setState({ [field]: text });
  };

  render() {
    const { navigation, error } = this.props;
    const { email, password, confirmPassword } = this.state;
    return (
      <SignUpRenderer
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        error={error}
        navigation={navigation}
        handleSignUp={this.handleSignUp}
        handleChangeText={this.handleChangeText}
      />
    );
  }
}

const mapStateToProps = ({ auth: { errors } }) => ({
  error: errors.signUp,
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signUpRequested(email, password)),
  clearError: () => dispatch({ type: actionTypes.CLEAR_AUTH_ERROR }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
