import * as actions from '../actions';
import { actionTypes, metaTypes } from '../constants';
import firebaseReducer from '../reducer';

describe('firebaseReducer reducer', () => {
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

  test(actionTypes.UPDATE_REQUESTED, () => {
    const initialState = {
      [metaTypes.updateMessage]: { inProgress: false, error: '' },
    };
    const action = actions.firebaseUpdateRequested(metaTypes.updateMessage);
    const expectedState = {
      [metaTypes.updateMessage]: { inProgress: true, error: '' },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });
  test(actionTypes.UPDATE_REJECTED, () => {
    const initialState = {
      [metaTypes.updateMessage]: { inProgress: true, error: '' },
    };
    const error = 'error';
    const action = actions.firebaseUpdateRejected(error, metaTypes.updateMessage);
    const expectedState = {
      [metaTypes.updateMessage]: { inProgress: false, error },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.UPDATE_FULFILLED, () => {
    const initialState = {
      [metaTypes.updateMessage]: { inProgress: true, error: '' },
    };
    const action = actions.firebaseUpdateFulfilled(metaTypes.updateMessage);
    const expectedState = {
      [metaTypes.updateMessage]: { inProgress: false, error: '' },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_REQUESTED, () => {
    const initialState = {
      [metaTypes.removeMessage]: { inProgress: false, error: '' },
    };
    const action = actions.firebaseRemoveRequested(metaTypes.removeMessage);
    const expectedState = {
      [metaTypes.removeMessage]: { inProgress: true, error: '' },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_REJECTED, () => {
    const initialState = {
      [metaTypes.removeMessage]: { inProgress: true, error: '' },
    };
    const error = 'error';
    const action = actions.firebaseRemoveRejected(error, metaTypes.removeMessage);
    const expectedState = {
      [metaTypes.removeMessage]: { inProgress: false, error },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.REMOVE_FULFILLED, () => {
    const initialState = {
      [metaTypes.removeMessage]: { inProgress: true, error: '' },
    };
    const action = actions.firebaseRemoveFulfilled(metaTypes.removeMessage);
    const expectedState = {
      [metaTypes.removeMessage]: { inProgress: false, error: '' },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_REQUESTED, () => {
    const initialState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: {},
      },
    };
    const ref = {};
    const action = actions.firebaseListenRequested(ref, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: {
        inProgress: true,
        error: '',
        items: {},
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_REJECTED, () => {
    const initialState = {
      [metaTypes.messages]: { inProgress: true, error: '', items: {} },
    };
    const error = 'error';
    const action = actions.firebaseListenRejected(error, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: { inProgress: false, error, items: {} },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_FULFILLED, () => {
    const initialState = {
      [metaTypes.messages]: { inProgress: true, error: '', items: {} },
    };
    const items = { 1: { text: 'hello' }, 2: { text: 'world' } };
    const action = actions.firebaseListenFulfilled(items, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: { inProgress: false, error: '', items },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_CHILD_ADDED, () => {
    const initialState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' }, 2: { text: 'world' } },
      },
    };
    const childId = '3';
    const child = { text: 'goodbye' };
    const action = actions.firebaseListenChildAdded(childId, child, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: {
          1: { text: 'hello' },
          2: { text: 'world' },
          3: { text: 'goodbye' },
        },
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_CHILD_CHANGED, () => {
    const initialState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: {
          1: { text: 'hello' },
          2: { text: 'world' },
          3: { text: 'goodbye' },
        },
      },
    };
    const childId = '3';
    const child = { text: 'ciao' };
    const action = actions.firebaseListenChildChanged(childId, child, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: {
          1: { text: 'hello' },
          2: { text: 'world' },
          3: { text: 'ciao' },
        },
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.LISTEN_CHILD_REMOVED, () => {
    const initialState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' }, 2: { text: 'world' } },
      },
    };
    const childId = '2';
    const action = actions.firebaseListenChildRemoved(childId, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' } },
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.LISTEN_REMOVED} clear items false`, () => {
    const initialState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' }, 2: { text: 'world' } },
      },
    };
    const action = actions.firebaseListenRemoved(false, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' }, 2: { text: 'world' } },
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(`${actionTypes.LISTEN_REMOVED} clear items true`, () => {
    const initialState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' }, 2: { text: 'world' } },
      },
    };
    const action = actions.firebaseListenRemoved(true, metaTypes.messages);
    const expectedState = {
      [metaTypes.messages]: {
        inProgress: false,
        error: '',
        items: {},
      },
    };
    expect(firebaseReducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.GET_FLOCK_REQUESTED, () => {
    const initialState = {
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        items: { a: 1, b: 2 },
      },
      [metaTypes.flocks]: {
        inProgress: false,
        error: '',
        items: {},
      },
    };
    const action = actions.getFlock('flockId1');
    expect(firebaseReducer(initialState, action)).toMatchSnapshot();
  });

  test(actionTypes.GET_FLOCK_FULFILLED, () => {
    const initialState = {
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        items: { a: 1, b: 2 },
      },
      [metaTypes.flocks]: {
        inProgress: true,
        error: '',
        items: {},
      },
    };
    const flock = {
      flock1: {
        name: 'Flock 1',
        ownedBy: 'userId1',
      },
    };
    let action = actions.getFlockFulfilled(flock);
    const newState = firebaseReducer(initialState, action);
    expect(newState).toMatchSnapshot();

    // Add another flock since there can be multiples
    const flock2 = {
      flock2: {
        name: 'Flock 2',
        ownedBy: 'userId2',
      },
    };
    action = actions.getFlockFulfilled(flock2);
    expect(firebaseReducer(newState, action)).toMatchSnapshot();
  });

  test(actionTypes.GET_FLOCK_REJECTED, () => {
    const initialState = {
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        items: { a: 1, b: 2 },
      },
      [metaTypes.flocks]: {
        inProgress: true,
        error: '',
        items: {
          flock1: {
            name: 'Flock 1',
            owneBy: 'UserId1',
          },
        },
      },
    };
    const action = actions.getFlockRejected('Error Message');
    expect(firebaseReducer(initialState, action)).toMatchSnapshot();
  });

  test('bogus action does nothing', () => {
    const initialState = {
      [metaTypes.userSettings]: {
        inProgress: false,
        error: '',
        items: { 1: { text: 'hello' }, 2: { text: 'world' } },
      },
    };
    const action = {
      type: 'DO_NOT_TOUCH_STATE_ACTION',
    };
    expect(firebaseReducer(initialState, action)).toBe(initialState);
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
