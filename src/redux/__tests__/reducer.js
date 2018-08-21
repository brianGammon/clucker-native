import * as actions from '../actions';
import {
  actionTypes, metaTypes, appStates, authTypes,
} from '../constants';
import firebaseReducer from '../reducer';

describe('firebaseReducer reducer', () => {
  let sampleState;
  beforeEach(() => {
    sampleState = {
      appState: appStates.STARTING,
      initialUrl: null,
      auth: {
        inProgress: false,
        errors: {
          signIn: null,
          signUp: null,
          resetPassword: null,
        },
        user: null,
      },
      joinForm: {
        inProgress: false,
        error: null,
      },
      addForm: {
        inProgress: false,
        error: null,
      },
      [metaTypes.userSettings]: {
        inProgress: false,
        error: null,
        data: { item1: 'item1value', item2: 'item2value' },
      },
      [metaTypes.flocks]: {
        inProgress: false,
        error: null,
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
    const { errors } = sampleState.auth;
    const initialState = {
      appState: appStates.STARTING,
      auth: {
        inProgress: false,
        errors,
        user,
      },
    };
    const action = actions.authStatusChanged(null);
    const expectedState = {
      appState: appStates.READY,
      auth: {
        inProgress: false,
        errors,
        user: null,
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.AUTH_ACTION_REQUESTED, () => {
    const action = {
      type: actionTypes.AUTH_ACTION_REQUESTED,
      payload: { email: 'test@example.com', password: 'test123' },
      meta: { type: authTypes.signIn },
    };
    const expectedState = {
      ...sampleState,
      auth: {
        ...sampleState.auth,
        inProgress: true,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.AUTH_ACTION_REQUESTED} after an error`, () => {
    const {
      auth: { errors },
    } = sampleState;
    sampleState.auth = {
      inProgress: false,
      errors: { ...errors, signIn: 'Error from before' },
      user: null,
    };

    const action = {
      type: actionTypes.AUTH_ACTION_REQUESTED,
      payload: { email: 'test@example.com', password: 'test123' },
      meta: { type: authTypes.signIn },
    };
    const expectedState = {
      ...sampleState,
      auth: {
        ...sampleState.auth,
        inProgress: true,
        errors,
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.AUTH_ACTION_FULFILLED, () => {
    const { auth: { errors } } = sampleState;
    sampleState.auth = { inProgress: true, errors, user: { uid: '123' } };
    const action = { type: actionTypes.AUTH_ACTION_FULFILLED, meta: { type: authTypes.signIn } };
    const expectedState = {
      ...sampleState,
      auth: {
        inProgress: false,
        errors,
        user: { uid: '123' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  // test(actionTypes.RESET_PASSWORD_REQUESTED, () => {
  //   const action = {
  //     type: actionTypes.RESET_PASSWORD_REQUESTED,
  //     payload: { email: 'test@example.com' },
  //   };
  //   const expectedState = {
  //     ...sampleState,
  //     auth: {
  //       inProgress: true,
  //       error: null,
  //       user: null,
  //     },
  //   };
  //   expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  // });

  // test(`${actionTypes.RESET_PASSWORD_REQUESTED} after an error`, () => {
  //   sampleState.auth = { inProgress: false, error: 'some error' };

  //   const action = {
  //     type: actionTypes.RESET_PASSWORD_REQUESTED,
  //     payload: { email: 'test@example.com' },
  //   };
  //   const expectedState = {
  //     ...sampleState,
  //     auth: {
  //       inProgress: true,
  //       error: null,
  //       user: null,
  //     },
  //   };
  //   expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  // });

  // test(actionTypes.RESET_PASSWORD_FULFILLED, () => {
  //   sampleState.auth = { inProgress: true, error: null, user: null };
  //   const action = { type: actionTypes.RESET_PASSWORD_FULFILLED };
  //   const expectedState = {
  //     ...sampleState,
  //     auth: {
  //       inProgress: false,
  //       error: null,
  //       user: null,
  //     },
  //   };
  //   expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  // });

  test(actionTypes.AUTH_ACTION_REJECTED, () => {
    const { auth: { errors } } = sampleState;
    Object.keys(authTypes).forEach((authType) => {
      sampleState.auth = { inProgress: true, errors, user: null };
      const error = new Error('Some error occurred');
      const action = { type: actionTypes.AUTH_ACTION_REJECTED, payload: { error }, meta: { type: authType } };
      const expectedState = {
        ...sampleState,
        auth: {
          inProgress: false,
          errors: { ...errors, [action.meta.type]: error.message },
          user: null,
        },
      };
      expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
    });
  });

  test(actionTypes.CLEAR_FLOCK, () => {
    const action = { type: actionTypes.CLEAR_FLOCK, payload: 'flock1' };
    const expectedState = {
      ...sampleState,
      flocks: {
        inProgress: false,
        error: null,
        data: {
          flock2: 'item2value',
        },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.CLEAR_ALL_FLOCKS, () => {
    const action = { type: actionTypes.CLEAR_ALL_FLOCKS };
    const expectedState = {
      ...sampleState,
      flocks: {
        inProgress: false,
        error: null,
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

  test(actionTypes.CLEAR_ERROR, () => {
    const action = {
      type: actionTypes.CLEAR_ERROR,
      meta: { type: metaTypes.userSettings },
    };
    const propertyState = sampleState.userSettings;
    const initialState = {
      ...sampleState,
      userSettings: {
        ...propertyState,
        error: 'Test error message',
      },
    };
    const expectedState = {
      ...sampleState,
      userSettings: { ...propertyState, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.CLEAR_AUTH_ERROR, () => {
    const action = {
      type: actionTypes.CLEAR_AUTH_ERROR,
    };
    const { auth } = sampleState;
    const initialState = {
      ...sampleState,
      auth: {
        ...sampleState.auth,
        errors: { ...auth.errors, signIn: 'Some error occurred' },
      },
    };
    const expectedState = {
      ...sampleState,
      auth,
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.CREATE_REQUESTED, () => {
    const initialState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: null,
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
        error: null,
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
        error: null,
        data: {},
      },
    };
    const action = actions.firebaseCreateFulfilled(metaTypes.userSettings);
    const expectedState = {
      ...initialState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: null,
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
        error: null,
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
        error: null,
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });
  test(actionTypes.UPDATE_REJECTED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const error = new Error('test error');
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
        error: null,
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
        error: null,
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_REJECTED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const error = new Error('test error message');
    const action = actions.firebaseRemoveRejected(
      error,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: error.message,
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
        error: null,
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
        error: null,
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_REJECTED, () => {
    sampleState[metaTypes.userSettings].inProgress = true;

    const error = new Error('error');
    const action = actions.firebaseListenRejected(
      error,
      metaTypes.userSettings,
    );
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        inProgress: false,
        error: error.message,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
        data: {
          flock1: {
            name: 'Flock 1',
            owneBy: 'UserId1',
          },
        },
      },
    };
    const error = new Error('Error Message');
    const action = actions.getFlockRejected(error);
    expect(firebaseReducer(state, action)).toMatchSnapshot();
  });

  test(actionTypes.JOIN_FLOCK_REQUESTED, () => {
    const action = {
      type: actionTypes.JOIN_FLOCK_REQUESTED,
      payload: { userId: 'user1', flockId: 'flock1' },
    };
    const expectedState = {
      ...sampleState,
      joinForm: { inProgress: true, error: null },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.JOIN_FLOCK_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      joinForm: { inProgress: true, error: null },
    };
    const action = {
      type: actionTypes.JOIN_FLOCK_FULFILLED,
    };
    const expectedState = {
      ...initialState,
      joinForm: { inProgress: false, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.JOIN_FLOCK_REJECTED, () => {
    const initialState = {
      ...sampleState,
      joinForm: { inProgress: true, error: null },
    };
    const error = new Error('Test error message');
    const action = {
      type: actionTypes.JOIN_FLOCK_REJECTED,
      payload: { error },
    };
    const expectedState = {
      ...initialState,
      joinForm: { inProgress: false, error: error.message },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.ADD_FLOCK_REQUESTED, () => {
    const action = {
      type: actionTypes.ADD_FLOCK_REQUESTED,
      payload: { userId: 'user1', flockId: 'flock1' },
    };
    const expectedState = {
      ...sampleState,
      addForm: { inProgress: true, error: null },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.ADD_FLOCK_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      addForm: { inProgress: true, error: null },
    };
    const action = {
      type: actionTypes.ADD_FLOCK_FULFILLED,
    };
    const expectedState = {
      ...initialState,
      addForm: { inProgress: false, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.ADD_FLOCK_REJECTED, () => {
    const initialState = {
      ...sampleState,
      addForm: { inProgress: true, error: null },
    };
    const error = new Error('Test error message');
    const action = {
      type: actionTypes.ADD_FLOCK_REJECTED,
      payload: { error },
    };
    const expectedState = {
      ...initialState,
      addForm: { inProgress: false, error: error.message },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.DELETE_FLOCK_REQUESTED, () => {
    const action = {
      type: actionTypes.DELETE_FLOCK_REQUESTED,
    };
    const expectedState = {
      ...sampleState,
      deleteFlock: { inProgress: true, error: null },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.DELETE_FLOCK_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      deleteFlock: {
        inProgress: true,
        error: 'test',
      },
    };
    const action = {
      type: actionTypes.DELETE_FLOCK_FULFILLED,
    };
    const expectedState = {
      ...sampleState,
      deleteFlock: { inProgress: false, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.DELETE_FLOCK_REJECTED, () => {
    const error = new Error('Test error message');
    const action = {
      type: actionTypes.DELETE_FLOCK_REJECTED,
      payload: { error },
    };
    const expectedState = {
      ...sampleState,
      deleteFlock: { inProgress: false, error: error.message },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.DELETE_CHICKEN_REQUESTED, () => {
    const action = {
      type: actionTypes.DELETE_CHICKEN_REQUESTED,
    };
    const expectedState = {
      ...sampleState,
      deleteChicken: { inProgress: true, error: null },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.DELETE_CHICKEN_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      deleteChicken: {
        inProgress: true,
        error: 'test',
      },
    };
    const action = {
      type: actionTypes.DELETE_CHICKEN_FULFILLED,
    };
    const expectedState = {
      ...sampleState,
      deleteChicken: { inProgress: false, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.DELETE_CHICKEN_REJECTED, () => {
    const error = new Error('Test error message');
    const action = {
      type: actionTypes.DELETE_CHICKEN_REJECTED,
      payload: { error },
    };
    const expectedState = {
      ...sampleState,
      deleteChicken: { inProgress: false, error: error.message },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
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
