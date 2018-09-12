import {
  metaTypes, authTypes, actionTypes as a, appStates,
} from './constants';

const getAuthErrorsInitialState = () => {
  const errors = {};
  Object.keys(authTypes).forEach((key) => {
    errors[key] = null;
  });
  return errors;
};

const getInitialState = () => {
  const state = {
    appState: appStates.STARTING,
    initialUrl: null,
    auth: {
      inProgress: false,
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
    deleteFlock: {
      inProgress: false,
      error: null,
    },
    deleteChicken: {
      inProgress: false,
      error: null,
    },
  };
  Object.keys(metaTypes).forEach((key) => {
    const subState = {
      initialized: false,
      inProgress: false,
      error: null,
      data: {},
    };
    state[key] = subState;
  });
  state.auth.errors = getAuthErrorsInitialState();
  return state;
};

const initialState = getInitialState();

const handlers = {
  [a.AUTH_STATUS_LOGGED_IN](state, action) {
    const errors = getAuthErrorsInitialState();
    const newState = {
      ...state,
      appState: appStates.READY,
      auth: {
        inProgress: false,
        errors,
        user: action.payload,
      },
    };
    return newState;
  },
  [a.AUTH_STATUS_LOGGED_OUT](state) {
    const errors = getAuthErrorsInitialState();
    const newState = {
      ...state,
      appState: appStates.READY,
      auth: { inProgress: false, errors, user: null },
    };
    return newState;
  },
  [a.AUTH_ACTION_REQUESTED](state) {
    const errors = getAuthErrorsInitialState();
    const auth = { inProgress: true, errors, user: null };
    const newState = { ...state, auth };
    return newState;
  },
  [a.AUTH_ACTION_FULFILLED](state) {
    const errors = getAuthErrorsInitialState();
    const { user } = state.auth;
    const auth = { inProgress: false, errors, user };
    const newState = { ...state, auth };
    return newState;
  },
  [a.AUTH_ACTION_REJECTED](state, action) {
    const { error } = action.payload;
    const errorType = action.meta.type;
    const errors = { ...getAuthErrorsInitialState(), [errorType]: error.message };
    const auth = {
      inProgress: false,
      errors,
      user: null,
    };
    const newState = { ...state, auth };
    return newState;
  },
  [a.SET_INITIAL_URL](state, action) {
    const newState = { ...state, initialUrl: action.payload };
    return newState;
  },
  [a.REMOVE_INITIAL_URL](state) {
    const newState = { ...state, initialUrl: null };
    return newState;
  },
  [a.CLEAR_ERROR](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, error: null },
    };
    return newState;
  },
  [a.CLEAR_AUTH_ERROR](state) {
    const errors = getAuthErrorsInitialState();
    const newState = {
      ...state,
      auth: { ...state.auth, errors },
    };
    return newState;
  },
  [a.CREATE_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true, error: null },
    };
    return newState;
  },
  [a.CREATE_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: null },
    };
    return newState;
  },
  [a.CREATE_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.UPDATE_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true, error: null },
    };
    return newState;
  },
  [a.UPDATE_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: null },
    };
    return newState;
  },
  [a.UPDATE_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.REMOVE_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true, error: null },
    };
    return newState;
  },
  [a.REMOVE_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: null },
    };
    return newState;
  },
  [a.REMOVE_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.LISTEN_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true, error: null },
    };
    return newState;
  },
  [a.LISTEN_FULFILLED](state, action) {
    const data = action.payload;
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        initialized: true,
        inProgress: false,
        error: null,
        data,
      },
    };
    return newState;
  },
  [a.LISTEN_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error: error.message },
    };
    return newState;
  },
  // notice child added and changed are the same at the moment
  [a.CHILD_ADDED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const data = {
      ...propertyState.data,
      [action.payload.key]: action.payload.data,
    };

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: null,
        data,
      },
    };
    return newState;
  },
  [a.CHILD_CHANGED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const data = {
      ...propertyState.data,
      [action.payload.key]: action.payload.data,
    };

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: null,
        data,
      },
    };
    return newState;
  },
  [a.CHILD_REMOVED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const data = { ...propertyState.data };
    delete data[action.payload.key];

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: null,
        data,
      },
    };
    return newState;
  },
  [a.LISTEN_REMOVED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const data = action.payload.clearData ? {} : propertyState.data;

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        error: null,
        data,
      },
    };
    return newState;
  },
  [a.SYNC_FLOCKS_REQUESTED](state) {
    const propertyState = state.flocks;

    const newState = {
      ...state,
      flocks: {
        ...propertyState,
        inProgress: true,
        error: null,
      },
    };
    return newState;
  },
  [a.SYNC_FLOCKS_FULFILLED](state) {
    const propertyState = state.flocks;
    const newState = {
      ...state,
      flocks: {
        ...propertyState,
        initialized: true,
        inProgress: false,
      },
    };
    return newState;
  },
  [a.SYNC_FLOCKS_REJECTED](state, action) {
    const propertyState = state.flocks;
    const { error } = action.payload;

    const newState = {
      ...state,
      flocks: {
        ...propertyState,
        initialized: true,
        inProgress: false,
        error: error.message,
      },
    };
    return newState;
  },
  [a.SET_FLOCK](state, action) {
    const propertyState = state.flocks;
    const propertyData = propertyState.data;
    const newData = { ...propertyData, ...action.payload };

    const newState = {
      ...state,
      flocks: {
        ...propertyState,
        data: newData,
      },
    };
    return newState;
  },
  [a.CLEAR_FLOCK](state, action) {
    const { flocks } = state;
    const { [action.payload]: removed, ...rest } = flocks.data;
    const newState = { ...state, flocks: { ...flocks, data: rest } };
    return newState;
  },
  [a.CLEAR_ALL_FLOCKS](state) {
    const { flocks } = getInitialState();
    const newState = { ...state, flocks };
    return newState;
  },
  [a.JOIN_FLOCK_REQUESTED](state) {
    const newState = {
      ...state,
      joinForm: { inProgress: true, error: null },
    };
    return newState;
  },
  [a.JOIN_FLOCK_FULFILLED](state) {
    const newState = {
      ...state,
      joinForm: { inProgress: false, error: null },
    };
    return newState;
  },
  [a.JOIN_FLOCK_REJECTED](state, action) {
    const { error } = action.payload;
    const newState = {
      ...state,
      joinForm: { inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.ADD_FLOCK_REQUESTED](state) {
    const newState = {
      ...state,
      addForm: { inProgress: true, error: null },
    };
    return newState;
  },
  [a.ADD_FLOCK_FULFILLED](state) {
    const newState = {
      ...state,
      addForm: { inProgress: false, error: null },
    };
    return newState;
  },
  [a.ADD_FLOCK_REJECTED](state, action) {
    const { error } = action.payload;
    const newState = {
      ...state,
      addForm: { inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.DELETE_FLOCK_REQUESTED](state) {
    const newState = {
      ...state,
      deleteFlock: { inProgress: true, error: null },
    };
    return newState;
  },
  [a.DELETE_FLOCK_FULFILLED](state) {
    const newState = {
      ...state,
      deleteFlock: { inProgress: false, error: null },
    };
    return newState;
  },
  [a.DELETE_FLOCK_REJECTED](state, action) {
    const { error } = action.payload;
    const newState = {
      ...state,
      deleteFlock: { inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.DELETE_CHICKEN_REQUESTED](state) {
    const newState = {
      ...state,
      deleteChicken: { inProgress: true, error: null },
    };
    return newState;
  },
  [a.DELETE_CHICKEN_FULFILLED](state) {
    const newState = {
      ...state,
      deleteChicken: { inProgress: false, error: null },
    };
    return newState;
  },
  [a.DELETE_CHICKEN_REJECTED](state, action) {
    const { error } = action.payload;
    const newState = {
      ...state,
      deleteChicken: { inProgress: false, error: error.message },
    };
    return newState;
  },
  [a.SWITCH_FLOCK_REQUESTED](state) {
    const { userSettings } = state;
    const newState = {
      ...state,
      userSettings: {
        ...userSettings,
        initialized: false,
      },
    };
    return newState;
  },
  [a.SWITCH_FLOCK_FULFILLED](state) {
    const { userSettings } = state;
    const newState = {
      ...state,
      userSettings: {
        ...userSettings,
        initialized: true,
      },
    };
    return newState;
  }
};

export default (state = initialState, action = {}) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    const newState = handlers[action.type](state, action);
    return newState;
  }
  return state;
};
