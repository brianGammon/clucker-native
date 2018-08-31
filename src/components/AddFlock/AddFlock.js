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
  value: string,
  error: string | null,
  touched: boolean,
};

const initialState = {
  value: '',
  error: null,
  touched: false,
};

class AddFlock extends React.Component<Props, State> {
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

  handleAddFlock = () => {
    const { userId, addFlock } = this.props;
    const { value } = this.state;
    if (!value || value.trim() === '') {
      return this.setError('Please enter a flock name.');
    }
    if (!/^[A-Za-z0-9 _-]+$/.test(value)) {
      return this.setError(
        'Only use letters, numbers, spaces, underscores, or dashes.',
      );
    }
    return addFlock(userId, value);
  };

  render() {
    const { userId } = this.props;
    return (
      <AddFlockRenderer
        userId={userId}
        handleAddFlock={this.handleAddFlock}
        handleChangeText={this.handleChangeText}
        {...this.state}
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
