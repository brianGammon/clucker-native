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
  flockId: string,
};

class JoinFlock extends React.Component<Props, State> {
  state = { flockId: '' };

  componentDidUpdate(prevProps) {
    const { inProgress, error } = this.props;
    if (prevProps.inProgress && !inProgress && !error) {
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({ flockId: '' });
  };

  handleChangeText = (text: string) => {
    this.setState({ flockId: text });
  };

  handleJoinFlock = () => {
    const { userId, joinFlock } = this.props;
    const { flockId } = this.state;
    joinFlock(userId, flockId);
  };

  render() {
    const { userId, error } = this.props;
    const { flockId } = this.state;
    return (
      <JoinFlockRenderer
        userId={userId}
        handleJoinFlock={this.handleJoinFlock}
        handleChangeText={this.handleChangeText}
        flockId={flockId}
        error={error}
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
