import { metaTypes, actionTypes as a } from './constants';

const getInitialState = () => {
  const state = {
    initialUrl: null,
  };
  Object.keys(metaTypes).forEach((key) => {
    const subState = { inProgress: false, error: '', items: {} };
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
  [a.UPDATE_REQUESTED](state, action) {
    const property = action.meta.type;
    const newState = { ...state, [property]: { inProgress: true, error: '' } };
    return newState;
  },
  [a.UPDATE_FULFILLED](state, action) {
    const property = action.meta.type;
    const newState = { ...state, [property]: { inProgress: false, error: '' } };
    return newState;
  },
  [a.UPDATE_REJECTED](state, action) {
    const property = action.meta.type;
    const { error } = action.payload;
    const newState = { ...state, [property]: { inProgress: false, error } };
    return newState;
  },
  [a.REMOVE_REQUESTED](state, action) {
    const property = action.meta.type;
    const newState = { ...state, [property]: { inProgress: true, error: '' } };
    return newState;
  },
  [a.REMOVE_FULFILLED](state, action) {
    const property = action.meta.type;
    const newState = { ...state, [property]: { inProgress: false, error: '' } };
    return newState;
  },
  [a.REMOVE_REJECTED](state, action) {
    const property = action.meta.type;
    const { error } = action.payload;
    const newState = { ...state, [property]: { inProgress: false, error } };
    return newState;
  },
  [a.LISTEN_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true, error: '' },
    };
    return newState;
  },
  [a.LISTEN_FULFILLED](state, action) {
    const { items } = action.payload;
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        items,
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
  [a.LISTEN_CHILD_ADDED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const items = {
      ...propertyState.items,
      [action.payload.id]: action.payload.value,
    };

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        items,
      },
    };
    return newState;
  },
  [a.LISTEN_CHILD_CHANGED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const items = {
      ...propertyState.items,
      [action.payload.id]: action.payload.value,
    };

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        items,
      },
    };
    return newState;
  },
  [a.LISTEN_CHILD_REMOVED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const items = { ...propertyState.items };
    delete items[action.payload.id];

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        items,
      },
    };
    return newState;
  },
  [a.LISTEN_REMOVED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];
    const items = action.payload.clearItems ? {} : propertyState.items;

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        items,
      },
    };
    return newState;
  },
  [a.GET_FLOCK_REQUESTED](state, action) {
    const property = action.meta.type;
    const propertyState = state[property];

    const newState = {
      ...state,
      [property]: { ...propertyState, inProgress: true, error: '' },
    };
    return newState;
  },
  [a.GET_FLOCK_FULFILLED](state, action) {
    // const flock = action.payload;
    const property = action.meta.type;
    const propertyState = state[property];
    const propertyItems = propertyState.items;
    const newItems = { ...propertyItems, ...action.payload };

    const newState = {
      ...state,
      [property]: {
        ...propertyState,
        inProgress: false,
        error: '',
        items: newItems,
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

export default (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    const newState = handlers[action.type](state, action);
    // console.log(newState);
    return newState;
  }
  return state;
};
