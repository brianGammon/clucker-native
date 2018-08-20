import * as React from 'react';
import { connect } from 'react-redux';
import { actionTypes } from '../../redux/constants';
import ResetPasswordRenderer from './ResetPasswordRenderer';

type Props = {
  error: string,
  inProgress: boolean,
  sendPasswordResetEmail: (email: string) => void,
  clearError: () => void,
};

type State = {
  email: string,
  successMessage: string,
};

class ResetPassword extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Reset Password',
  };

  state = { email: '', successMessage: null };

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

  handleChangeText = (text: string) => {
    this.setState({ email: text });
  };

  handleSendPasswordResetEmail = () => {
    const { sendPasswordResetEmail } = this.props;
    const { email } = this.state;
    sendPasswordResetEmail(email);
  };

  render() {
    const { error } = this.props;
    const { email, successMessage } = this.state;
    return (
      <ResetPasswordRenderer
        email={email}
        successMessage={successMessage}
        error={error}
        handleChangeText={this.handleChangeText}
        handleSendPasswordResetEmail={this.handleSendPasswordResetEmail}
      />
    );
  }
}

const mapStateToProps = ({ auth: { error, inProgress } }) => ({
  error,
  inProgress,
});

const mapDispatchToProps = dispatch => ({
  sendPasswordResetEmail: (email: string) => dispatch({
    type: actionTypes.RESET_PASSWORD_REQUESTED,
    payload: { email },
  }),
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR, meta: { type: 'auth' } }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
