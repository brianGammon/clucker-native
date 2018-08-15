/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import AddFlockRenderer from './AddFlockRenderer';
import { actionTypes } from '../../redux/constants';

type Props = {
  userId: string,
  addFlock: (userId: string, name: string) => void,
  error: string,
  inProgress: boolean,
};

type State = {
  name: string,
};

class AddFlock extends React.Component<Props, State> {
  state = { name: '' };

  componentDidUpdate(prevProps) {
    const { inProgress, error } = this.props;
    if (prevProps.inProgress && !inProgress && error === '') {
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({ name: '' });
  };

  handleChangeText = (text: string) => {
    this.setState({ name: text });
  };

  handleAddFlock = () => {
    const { userId, addFlock } = this.props;
    const { name } = this.state;
    addFlock(userId, name);
  };

  render() {
    const { userId, error } = this.props;
    const { name } = this.state;
    return (
      <AddFlockRenderer
        userId={userId}
        handleAddFlock={this.handleAddFlock}
        handleChangeText={this.handleChangeText}
        name={name}
        error={error}
      />
    );
  }
}

const mapStateToProps = ({
  auth: { user },
  addForm: { error, inProgress },
}) => ({
  userId: user ? user.uid : '',
  error,
  inProgress,
});

const mapDispatchToProps = dispatch => ({
  addFlock: (userId: string, name: string) => dispatch({
    type: actionTypes.ADD_FLOCK_REQUESTED,
    payload: { userId, name },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFlock);
