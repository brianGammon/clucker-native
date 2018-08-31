/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import JoinFlockRenderer from './JoinFlockRenderer';
import { actionTypes } from '../../redux/constants';

type Props = {
  userId: string,
  joinFlock: (userId: string, flockId: string) => void,
  error: string,
  inProgress: boolean,
};

type State = {
  value: string,
  error: string | null,
  touched: boolean,
};

const initialState = {
  value: '',
  error: null,
  touched: false,
};

class JoinFlock extends React.Component<Props, State> {
  state = initialState;

  componentDidUpdate(prevProps) {
    const { inProgress, error } = this.props;
    if (!prevProps.error && error) {
      this.setError(error);
    }
    if (prevProps.inProgress && !inProgress && !error) {
      this.resetForm();
    }
  }

  setError = (error: string) => this.setState({ error, touched: true });

  resetForm = () => {
    this.setState(initialState);
  };

  handleChangeText = (text: string) => {
    this.setState({ value: text, error: null, touched: true });
  };

  handleJoinFlock = () => {
    const { userId, joinFlock } = this.props;
    const { value } = this.state;
    if (!value || value.trim() === '') {
      return this.setError('Please enter a flock ID.');
    }
    return joinFlock(userId, value);
  };

  render() {
    const { userId } = this.props;
    return (
      <JoinFlockRenderer
        userId={userId}
        handleJoinFlock={this.handleJoinFlock}
        handleChangeText={this.handleChangeText}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = ({
  auth: { user },
  joinForm: { error, inProgress },
}) => ({
  userId: user ? user.uid : '',
  error,
  inProgress,
});

const mapDispatchToProps = dispatch => ({
  joinFlock: (userId: string, flockId: string) => dispatch({
    type: actionTypes.JOIN_FLOCK_REQUESTED,
    payload: { userId, flockId },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinFlock);
