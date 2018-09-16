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
        initialized: false,
        inProgress: false,
        error: null,
        data: { item1: 'item1value', item2: 'item2value' },
      },
      [metaTypes.flocks]: {
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
        inProgress: true,
        error: null,
        data: {},
      },
    };
    const action = actions.firebaseCreateFulfilled(metaTypes.userSettings);
    const expectedState = {
      ...initialState,
      [metaTypes.userSettings]: {
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
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
        initialized: true,
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
        initialized: false,
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
        initialized: false,
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
        initialized: false,
        inProgress: false,
        error: null,
        data: { item2: 'item2value' },
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.LISTEN_REMOVED} clear data false`, () => {
    const action = actions.firebaseListenRemoved(false, metaTypes.userSettings);
    const state = {
      ...sampleState,
      [metaTypes.userSettings]: {
        initialized: true,
        inProgress: true,
        error: 'Some error from before',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        initialized: true,
        inProgress: true,
        error: null,
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(`${actionTypes.LISTEN_REMOVED} clear data true`, () => {
    const action = actions.firebaseListenRemoved(true, metaTypes.userSettings);
    const state = {
      ...sampleState,
      [metaTypes.userSettings]: {
        initialized: true,
        inProgress: true,
        error: 'Some error from before',
        data: { item1: 'item1value', item2: 'item2value' },
      },
    };
    const expectedState = {
      ...sampleState,
      [metaTypes.userSettings]: {
        initialized: true,
        inProgress: true,
        error: null,
        data: {},
      },
    };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(actionTypes.SYNC_FLOCKS_REQUESTED, () => {
    // Sets inProgess to true and clears any error
    const flocksState = sampleState.flocks;
    const state = {
      ...sampleState,
      flocks: {
        ...flocksState,
        inProgress: false,
        error: new Error('Test error'),
      },
    };
    const expectedState = {
      ...sampleState,
      flocks: {
        ...flocksState,
        inProgress: true,
        error: null,
      },
    };

    const action = { type: actionTypes.SYNC_FLOCKS_REQUESTED };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(actionTypes.SYNC_FLOCKS_FULFILLED, () => {
    // Simply sets initialized to true
    const flocksState = sampleState.flocks;
    const state = {
      ...sampleState,
      flocks: {
        ...flocksState,
        initialized: false,
        inProgress: true,
        data: {
          flock1: {
            name: 'Flock 1',
            ownedBy: 'user1',
          },
        },
      },
    };
    const expectedState = {
      ...sampleState,
      flocks: {
        ...flocksState,
        initialized: true,
        inProgress: false,
        data: {
          flock1: {
            name: 'Flock 1',
            ownedBy: 'user1',
          },
        },
      },
    };
    const action = { type: actionTypes.SYNC_FLOCKS_FULFILLED };
    const newState = firebaseReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test(actionTypes.SYNC_FLOCKS_REJECTED, () => {
    const flocksState = sampleState.flocks;
    const state = {
      ...sampleState,
      flocks: {
        ...flocksState,
        initialized: false,
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
    const expectedState = {
      ...sampleState,
      flocks: {
        ...flocksState,
        initialized: true,
        inProgress: false,
        error: error.message,
        data: {
          flock1: {
            name: 'Flock 1',
            owneBy: 'UserId1',
          },
        },
      },
    };

    const action = { type: actionTypes.SYNC_FLOCKS_REJECTED, payload: { error } };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(actionTypes.SET_FLOCK, () => {
    const state = {
      ...sampleState,
      flocks: {
        initialized: true,
        inProgress: true,
        error: null,
        data: {
          flock1: 'item1value',
        },
      },
    };
    const action = { type: actionTypes.SET_FLOCK, payload: { flock2: 'item2value' } };
    const expectedState = {
      ...sampleState,
      flocks: {
        initialized: true,
        inProgress: true,
        error: null,
        data: {
          flock1: 'item1value',
          flock2: 'item2value',
        },
      },
    };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });
  test(actionTypes.CLEAR_FLOCK, () => {
    const action = { type: actionTypes.CLEAR_FLOCK, payload: 'flock1' };
    const expectedState = {
      ...sampleState,
      flocks: {
        initialized: false,
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
        initialized: false,
        inProgress: false,
        error: null,
        data: {},
      },
    };
    expect(firebaseReducer(sampleState, action)).toEqual(expectedState);
  });

  test(actionTypes.JOIN_FLOCK_REQUESTED, () => {
    const state = {
      ...sampleState,
      appState: appStates.READY,
    };
    const action = {
      type: actionTypes.JOIN_FLOCK_REQUESTED,
      payload: { userId: 'user1', flockId: 'flock1' },
    };
    const expectedState = {
      ...state,
      appState: appStates.BUSY,
      joinForm: { inProgress: true, error: null },
    };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(actionTypes.JOIN_FLOCK_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      appState: appStates.BUSY,
      joinForm: { inProgress: true, error: null },
    };
    const action = {
      type: actionTypes.JOIN_FLOCK_FULFILLED,
    };
    const expectedState = {
      ...initialState,
      appState: appStates.READY,
      joinForm: { inProgress: false, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.JOIN_FLOCK_REJECTED, () => {
    const initialState = {
      ...sampleState,
      appState: appStates.BUSY,
      joinForm: { inProgress: true, error: null },
    };
    const error = new Error('Test error message');
    const action = {
      type: actionTypes.JOIN_FLOCK_REJECTED,
      payload: { error },
    };
    const expectedState = {
      ...initialState,
      appState: appStates.READY,
      joinForm: { inProgress: false, error: error.message },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.ADD_FLOCK_REQUESTED, () => {
    const state = {
      ...sampleState,
      appState: appStates.READY,
    };
    const action = {
      type: actionTypes.ADD_FLOCK_REQUESTED,
      payload: { userId: 'user1', flockId: 'flock1' },
    };
    const expectedState = {
      ...state,
      appState: appStates.BUSY,
      addForm: { inProgress: true, error: null },
    };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(actionTypes.ADD_FLOCK_FULFILLED, () => {
    const initialState = {
      ...sampleState,
      appState: appStates.BUSY,
      addForm: { inProgress: true, error: null },
    };
    const action = {
      type: actionTypes.ADD_FLOCK_FULFILLED,
    };
    const expectedState = {
      ...initialState,
      appState: appStates.READY,
      addForm: { inProgress: false, error: null },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.ADD_FLOCK_REJECTED, () => {
    const initialState = {
      ...sampleState,
      appState: appStates.BUSY,
      addForm: { inProgress: true, error: null },
    };
    const error = new Error('Test error message');
    const action = {
      type: actionTypes.ADD_FLOCK_REJECTED,
      payload: { error },
    };
    const expectedState = {
      ...initialState,
      appState: appStates.READY,
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

  test(actionTypes.SWITCH_FLOCK_REQUESTED, () => {
    const state = {
      ...sampleState,
      userSettings: {
        ...sampleState.userSettings,
        initialized: true,
      },
    };
    const expectedState = {
      ...sampleState,
      userSettings: {
        ...sampleState.userSettings,
        initialized: false,
      },
    };
    const action = { type: actionTypes.SWITCH_FLOCK_REQUESTED };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
  });

  test(actionTypes.SWITCH_FLOCK_FULFILLED, () => {
    const state = {
      ...sampleState,
      userSettings: {
        ...sampleState.userSettings,
        initialized: false,
      },
    };
    const expectedState = {
      ...sampleState,
      userSettings: {
        ...sampleState.userSettings,
        initialized: true,
      },
    };
    const action = { type: actionTypes.SWITCH_FLOCK_FULFILLED };
    expect(firebaseReducer(state, action)).toEqual(expectedState);
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
