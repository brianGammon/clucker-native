import React from 'react';
import { shallow } from 'enzyme';
import { Linking } from 'react-native';
import configureStore from 'redux-mock-store';

import ConnectedApp from '.';
import * as actions from '../../redux/actions';
import { appStates } from '../../redux/constants';

describe('App component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    appState: appStates.STARTING,
    userSettings: {
      name: 'Test Name',
      currentFlockId: 'Flock11',
      flocks: {
        XYZ123: true,
        XYZ124: true,
      },
    },
    flocks: {
      initialized: true,
    },
  };

  const getStore = state => mockStore(state);

  const getWrapper = store => shallow(<ConnectedApp store={store} />).dive();

  test('Should render Splash when not initialized', () => {
    const wrapper = getWrapper(getStore(initialState));
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().componentWillUnmount();
  });

  test('Should render Root Navigator when initialized', () => {
    const state = { ...initialState, appState: appStates.READY };
    const store = getStore(state);
    const wrapper = getWrapper(store);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch setInitialUrl when initialUrl is set', (done) => {
    const initialUrl = 'test://url';
    const expectedAction = actions.setInitialUrl(initialUrl);
    Linking.getInitialURL = jest.fn(() => Promise.resolve(initialUrl));
    const store = getStore(initialState);
    const promise = new Promise((resolve) => {
      store.dispatch = jest.fn(() => resolve());
      getWrapper(store);
    });

    promise.then(() => {
      expect(store.dispatch).toBeCalledWith(expectedAction);
      done();
    });
  });

  test('Should not dispatch when no initialUrl is set', (done) => {
    Linking.getInitialURL = jest.fn(() => Promise.resolve(null));
    const store = getStore(initialState);
    const promise = new Promise((resolve) => {
      store.dispatch = jest.fn(() => Promise.resolve());

      getWrapper(store);
      setImmediate(resolve);
    });

    promise.then(() => {
      expect(store.dispatch).not.toBeCalled();
      done();
    });
  });
});
