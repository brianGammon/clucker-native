import * as actions from '../actions';
import { actionTypes, metaTypes, appStates } from '../constants';
import firebaseReducer from '../reducer';

describe('firebaseReducer reducer', () => {
  let sampleState;
  beforeEach(() => {
    sampleState = {
      appState: appStates.STARTING,
      initialUrl: null,
      authState: {
        inProgress: false,
        error: '',
        user: null,
      },
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
      [metaTypes.flocks]: {
        inProgress: false,
        error: '',
        data: { flock1: 'item1value', flock2: 'item2value' },
      },
    };
  });

  test(actionTypes.AUTH_STATUS_LOGGED_IN, () => {
    const user = { uid: 'testId', email: 'test@example.com' };
    const action = actions.authStatusChanged(user);
    expect(firebaseReducer(sampleState, action)).toMatchSnapshot();
  });

  test(actionTypes.AUTH_STATUS_LOGGED_OUT, () => {
    const user = { uid: 'testId', email: 'test@example.com' };
    const initialState = {
      appState: appStates.STARTING,
      authState: {
        inProgress: false,
        error: '',
        user,
      },
    };
    const action = actions.authStatusChanged(null);
    const expectedState = {
      appState: appStates.READY,
      authState: {
        inProgress: false,
        error: '',
        user: null,
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.SIGN_IN_REQUESTED, () => {
    const action = actions.signInRequested('email', 'password');
    const expectedState = {
      ...sampleState,
      authState: {
        inProgress: true,
        error: '',
        user: null,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.SIGN_IN_REQUESTED} after an error`, () => {
    sampleState.authState = { inProgress: false, error: 'some error' };

    const action = actions.signInRequested('email', 'password');
    const expectedState = {
      ...sampleState,
      authState: {
        inProgress: true,
        error: '',
        user: null,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.SIGN_IN_FULFILLED, () => {
    sampleState.authState = { inProgress: true, error: '' };
    const action = { type: actionTypes.SIGN_IN_FULFILLED };
    const expectedState = {
      ...sampleState,
      authState: {
        inProgress: false,
        error: '',
        user: null,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.SIGN_IN_REJECTED, () => {
    sampleState.authState = { inProgress: true, error: '' };
    const error = new Error('Some error occurred');
    const action = actions.signInRejected(error);
    const expectedState = {
      ...sampleState,
      authState: {
        inProgress: false,
        error: error.message,
        user: null,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.CLEAR_FLOCKS, () => {
    const action = { type: actionTypes.CLEAR_FLOCKS };
    const expectedState = {
      ...sampleState,
      flocks: {
        inProgress: false,
        error: '',
        data: {},
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });
  test(actionTypes.SET_INITIAL_URL, () => {
    const initialState = {
      someOtherState: 1,
      initialUrl: null,
    };
    const action = actions.setInitialUrl('someUrl');
    const expectedState = {
      someOtherState: 1,
      initialUrl: 'someUrl',
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_INITIAL_URL, () => {
    const initialState = {
      someOtherState: 1,
      initialUrl: 'someUrl',
    };
    const action = actions.removeInitialUrl();
    const expectedState = {
      someOtherState: 1,
      initialUrl: null,
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.CREATE_REQUESTED, () => {
    const initialState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: {},
      },
    };
    const payload = {};
    const action = actions.firebaseCreateRequested(
      payload,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...initialState,
      [metaTypes.userSettings]: {
        inProgress: true,
        error: '',
        data: {},
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.CREATE_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: true,
        error: '',
        data: {},
      },
    };
    const action = actions.firebaseCreateFulfilled(metaTypes.userSettings);
    const expectedState = {
      ...initialState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: {},
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.CREATE_REJECTED, () => {
    const initialState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: true,
        error: '',
        data: {},
      },
    };
    const error = new Error('Some error message');
    const action = actions.firebaseCreateRejected(
      error,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...initialState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: error.message,
        data: {},
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.UPDATE_REQUESTED, () => {
    const action = actions.firebaseUpdateRequested(
      { item1: 'updateItem1Value' },
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: true,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });
  test(actionTypes.UPDATE_REJECTED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const error = 'test error';
    const action = actions.firebaseUpdateRejected(
      error,
      metaTypes.userSettings,
    );

    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: 'test error',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.UPDATE_FULFILLED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const action = actions.firebaseUpdateFulfilled(metaTypes.userSettings);
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_REQUESTED, () => {
    const action = actions.firebaseRemoveRequested(
      { key: 'item1' },
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: true,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_REJECTED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const error = 'test error message';
    const action = actions.firebaseRemoveRejected(
      error,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error,
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_FULFILLED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const action = actions.firebaseRemoveFulfilled(metaTypes.userSettings);
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_REQUESTED, () => {
    const ref = {};
    const action = actions.firebaseListenRequested(ref, metaTypes.userSettings);
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: true,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_REJECTED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const error = 'error';
    const action = actions.firebaseListenRejected(
      error,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error,
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_FULFILLED, () => {
    sampleState[metaTypes.userSettings].data = {};

    const data = { 1: { text: 'hello' }, 2: { text: 'world' } };
    const action = actions.firebaseListenFulfilled(
      data,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.CHILD_ADDED, () => {
    const childKey = 'item3';
    const childData = 'item3value';
    const action = actions.firebaseListenChildAdded(
      childKey,
      childData,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item1: 'item1value', item2: 'item2value', item3: 'item3value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.CHILD_CHANGED, () => {
    const childKey = 'item2';
    const childData = 'updatedItem2value';
    const action = actions.firebaseListenChildChanged(
      childKey,
      childData,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item1: 'item1value', item2: 'updatedItem2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.CHILD_REMOVED, () => {
    const childKey = 'item1';
    const action = actions.firebaseListenChildRemoved(
      childKey,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.LISTEN_REMOVED} clear data false`, () => {
    const action = actions.firebaseListenRemoved(false, metaTypes.userSettings);
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.LISTEN_REMOVED} clear data true`, () => {
    const action = actions.firebaseListenRemoved(true, metaTypes.userSettings);
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        data: {},
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.GET_FLOCK_REQUESTED, () => {
    const state = {
      ...sampleState,
      [metaTypes.flocks]: {
        inProgress: false,
        error: '',
        data: {},
      },
    };

    const action = actions.getFlock('flockId1');
    expect(firebaseReducer(state, action)).toMatchSnapshot();
  });

  test(actionTypes.GET_FLOCK_FULFILLED, () => {
    const state = {
      ...sampleState,
      [metaTypes.flocks]: {
        inProgress: true,
        error: '',
        data: {},
      },
    };
    const flock = {
      flock1: {
        name: 'Flock 1',
        ownedBy: 'user1',
      },
    };
    let action = actions.getFlockFulfilled(flock);
    const newState = firebaseReducer(state, action);
    expect(newState).toMatchSnapshot();

    // Add another flock since there can be multiples
    const flock2 = {
      flock2: {
        name: 'Flock 2',
        ownedBy: 'user2',
      },
    };
    action = actions.getFlockFulfilled(flock2);
    expect(firebaseReducer(newState, action)).toMatchSnapshot();
  });

  test(actionTypes.GET_FLOCK_REJECTED, () => {
    const state = {
      ...sampleState,
      [metaTypes.flocks]: {
        inProgress: true,
        error: '',
        data: {
          flock1: {
            name: 'Flock 1',
            owneBy: 'UserId1',
          },
        },
      },
    };
    const action = actions.getFlockRejected('Error Message');
    expect(firebaseReducer(state, action)).toMatchSnapshot();
  });

  test('bogus action does nothing', () => {
    const action = {
      type: 'DO_NOT_TOUCH_STATE_ACTION',
    };
    expect(firebaseReducer(sampleState, action)).toBe(sampleState);
  });

  test('undefined initial state', () => {
    const action = {
      type: 'DO_NOT_TOUCH_STATE_ACTION',
    };
    expect(firebaseReducer(undefined, action)).toMatchSnapshot();
  });

  test('missing initial state', () => {
    expect(firebaseReducer()).toMatchSnapshot();
  });
});
