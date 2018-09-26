/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import ErrorHandleRenderer from './ErrorHandleRenderer';
import { actionTypes, metaTypes } from '../../redux/constants';

type Props = {
  error: string,
  uid: string,
  startListening: (uid: string) => void,
  clearErrors: () => void,
};

const ErrorHandler = ({
  error, uid, startListening, clearErrors,
}: Props) => {
  if (!error) {
    return null;
  }
  return (
    <ErrorHandleRenderer
      error={error}
      uid={uid}
      startListening={startListening}
      clearErrors={clearErrors}
    />
  );
};

const mapStateToProps = ({
  auth: { user },
  chickens: { error: chickensError },
  eggs: { error: eggsError },
}) => ({
  error: chickensError || eggsError,
  uid: user && user.uid,
});

const mapDispatchToProps = dispatch => ({
  startListening: (userId) => {
    dispatch(actions.listenToChickens(userId));
    dispatch(actions.listenToEggs(userId));
  },
  clearErrors: () => {
    dispatch({
      type: actionTypes.CLEAR_ERROR,
      meta: { type: metaTypes.chickens },
    });
    dispatch({ type: actionTypes.CLEAR_ERROR, meta: { type: metaTypes.eggs } });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler);
