import * as React from 'react';
import { connect } from 'react-redux';
import { FormBuilder, Validators } from 'react-reactive-form';
import { actionTypes } from '../../redux/constants';
import { resetPasswordRequested } from '../../redux/actions';
import ResetPasswordRenderer from './ResetPasswordRenderer';

type Props = {
  navigation: any,
  error: string,
  inProgress: boolean,
  sendPasswordResetEmail: (email: string) => void,
  clearError: () => void,
};

type State = {
  successMessage: string,
};

class ResetPassword extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Reset Password',
  };

  form = FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
  });

  state = { successMessage: null };

  componentDidUpdate(prevProps) {
    const { inProgress: prevInProgress } = prevProps;
    const { inProgress, error } = this.props;
    if (prevInProgress && !inProgress && !error) {
      this.setSuccess();
    }
  }

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  setSuccess = () => {
    this.setState({ successMessage: 'Check your inbox for an email.' });
  };

  handleSubmit = () => {
    const { email } = this.form.value;
    const { sendPasswordResetEmail } = this.props;
    sendPasswordResetEmail(email);
  };

  render() {
    const { navigation, error } = this.props;
    const { successMessage } = this.state;
    return (
      <ResetPasswordRenderer
        navigation={navigation}
        form={this.form}
        successMessage={successMessage}
        error={error}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = ({ auth: { errors, inProgress } }) => ({
  error: errors.resetPassword,
  inProgress,
});

const mapDispatchToProps = dispatch => ({
  sendPasswordResetEmail: (email: string) => dispatch(resetPasswordRequested(email)),
  clearError: () => dispatch({ type: actionTypes.CLEAR_AUTH_ERROR }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
