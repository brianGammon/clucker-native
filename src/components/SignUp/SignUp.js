/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { FormBuilder, Validators } from 'react-reactive-form';
import SignUpRenderer from './SignUpRenderer';
import { signUpRequested } from '../../redux/actions';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  inProgress: boolean,
  error: string,
  signUp: (email: string, password: string) => void,
  clearError: () => void,
};

class SignUp extends React.Component<Props> {
  inputRefs = {};

  loginForm = FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  focusNext = (field: string) => {
    // eslint-disable-next-line no-underscore-dangle
    this.inputRefs[field]._root.focus();
  };

  handleSubmit = () => {
    const { email, password } = this.loginForm.value;
    const { signUp } = this.props;
    signUp(email, password);
  };

  render() {
    const { navigation, error, inProgress } = this.props;
    return (
      <SignUpRenderer
        inProgress={inProgress}
        inputRefs={this.inputRefs}
        focusNext={this.focusNext}
        navigation={navigation}
        error={error}
        loginForm={this.loginForm}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = ({ auth: { inProgress, errors } }) => ({
  inProgress,
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
