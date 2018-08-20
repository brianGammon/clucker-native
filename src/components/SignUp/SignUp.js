import * as React from 'react';
import { connect } from 'react-redux';
import SignUpRenderer from './SignUpRenderer';
import { signInRequested } from '../../redux/actions';
import { type User } from '../../types';

type Props = {
  navigation: any,
  auth: {
    inProgress: boolean,
    error: string,
    user: User,
  },
  signUp: (email: string, password: string) => void,
};

type State = {
  email: string,
  password: string,
};

class SignUp extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Sign In',
  };

  state = {
    email: '',
    password: '',
  };

  handleSignUp = async () => {
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp(email, password);
  };

  handleChangeText = (field: string, text: string) => {
    this.setState({ [field]: text });
  };

  render() {
    const {
      navigation,
      auth: { error },
    } = this.props;
    const { email, password } = this.state;
    return (
      <SignUpRenderer
        email={email}
        password={password}
        error={error}
        navigation={navigation}
        handleSignUp={this.handleSignUp}
        handleChangeText={this.handleChangeText}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signInRequested(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
