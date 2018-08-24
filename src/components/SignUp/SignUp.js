import * as React from 'react';
import { connect } from 'react-redux';
import { FormBuilder, Validators } from 'react-reactive-form';
import SignUpRenderer from './SignUpRenderer';
import { signUpRequested } from '../../redux/actions';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  error: string,
  signUp: (email: string, password: string) => void,
  clearError: () => void,
};

const mustMatchValidator = (target: string, compareTo: string) => (group) => {
  const targetControl = group.controls[target];
  const compareToControl = group.controls[compareTo];
  if (targetControl.value !== compareToControl.value) {
    targetControl.setErrors({ mustMatch: true });
  } else {
    targetControl.setErrors(null);
  }
  return null;
};

class SignUp extends React.Component<Props> {
  static navigationOptions = {
    title: 'Sign In',
  };

  loginForm = FormBuilder.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: mustMatchValidator('confirmPassword', 'password') },
  );

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  handleReset = () => {
    const { clearError } = this.props;
    this.loginForm.reset();
    clearError();
  };

  handleSubmit = () => {
    const { email, password } = this.loginForm.value;
    const { signUp } = this.props;
    signUp(email, password);
  };

  render() {
    const { navigation, error } = this.props;
    return (
      <SignUpRenderer
        navigation={navigation}
        error={error}
        loginForm={this.loginForm}
        handleReset={this.handleReset}
        handleSubmit={this.handleSubmit}
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
