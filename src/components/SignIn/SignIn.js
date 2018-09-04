import * as React from 'react';
import { connect } from 'react-redux';
import { FormBuilder, Validators } from 'react-reactive-form';
import SignInRenderer from './SignInRenderer';
import { signInRequested } from '../../redux/actions';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  error: string,
  signIn: (email: string, password: string) => void,
  clearError: () => void,
};

class SignIn extends React.Component<Props> {
  loginForm = FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  handleSubmit = () => {
    const { email, password } = this.loginForm.value;
    const { signIn } = this.props;
    signIn(email, password);
  };

  render() {
    const { navigation, error } = this.props;
    return (
      <SignInRenderer
        navigation={navigation}
        error={error}
        loginForm={this.loginForm}
        handleSubmit={this.handleSubmit}
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
