import { metaTypes, actionTypes as a, appStates } from './constants';

const getInitialState = () => {
  const state = {
    appState: appStates.STARTING,
    initialUrl: null,
    authState: {
      inProgress: false,
      error: '',
      user: null,
    },
  };
  Object.keys(metaTypes).forEach((key) => {
    const subState = {
      inProgress: false,
      error: '',
      data: {},
    };
    state[key] = subState;
  });
  return state;
};

const initialState = getInitialState();

const handlers = {
  [a.AUTH_STATUS_LOGGED_IN](state, action) {
    const newState = {
      ...state,
      appState: appStates.READY,
      authState: {
        inProgress: false,
        error: '',
        user: action.payload,
      },
    };
    return newState;
  },
  [a.AUTH_STATUS_LOGGED_OUT](state) {
    const newState = {
      ...state,
      appState: appStates.READY,
      authState: { inProgress: false, error: '', user: null },
    };
    return newState;
  },
  [a.SIGN_IN_REQUESTED](state) {
    const authState = { inProgress: true, error: '', user: null };
    const newState = { ...state, authState };
    return newState;
  },
  [a.SIGN_IN_FULFILLED](state) {
    const authState = { inProgress: false, error: '', user: null };
    const newState = { ...state, authState };
    return newState;
  },
  [a.SIGN_IN_REJECTED](state, action) {
    const authState = {
      inProgress: false,
      error: action.payload.message,
      user: null,
    };
    const newState = { ...state, authState };
    return newState;
  },
  [a.CLEAR_FLOCKS](state) {
    const { flocks } = getInitialState();
    const newState = { ...state, flocks };
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
  [a.CREATE_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true },
    };
    return newState;
  },
  [a.CREATE_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false },
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
      [property]: { ...propertyState, inProgress: true },
    };
    return newState;
  },
  [a.UPDATE_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false },
    };
    return newState;
  },
  [a.UPDATE_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error },
    };
    return newState;
  },
  [a.REMOVE_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true },
    };
    return newState;
  },
  [a.REMOVE_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false },
    };
    return newState;
  },
  [a.REMOVE_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;
    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error },
    };
    return newState;
  },
  [a.LISTEN_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true },
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
        inProgress: false,
        error: '',

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
      [property]: { ...propertyState, inProgress: false, error },
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
        error: '',
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
        error: '',
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
        error: '',
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
        inProgress: false,
        error: '',

        data,
      },
    };
    return newState;
  },
  [a.GET_FLOCK_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true },
    };
    return newState;
  },
  [a.GET_FLOCK_FULFILLED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const propertyData = propertyState.data;
    const newData = { ...propertyData, ...action.payload };

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        data: newData,
      },
    };
    return newState;
  },
  [a.GET_FLOCK_REJECTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const { error } = action.payload;

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: false, error },
    };
    return newState;
  },
};

export default (state = initialState, action = {}) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    const newState = handlers[action.type](state, action);
    return newState;
  }
  return state;
};
