import { metaTypes, actionTypes as a } from './constants';

const getInitialState = () => {
  const state = {
    initialUrl: null,
  };
  Object.keys(metaTypes).forEach((key) => {
    const subState = {
      inProgress: false,
      error: '',
      key: '',
      data: {},
    };
    state[key] = subState;
  });
  return state;
};

const initialState = getInitialState();

const handlers = {
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
      [property]: { ...propertyState, inProgress: false, error },
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
    const { key, data } = action.payload;
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        key,
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
    const key = action.payload.clearData ? '' : propertyState.key;
    const data = action.payload.clearData ? {} : propertyState.data;

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        key,
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
