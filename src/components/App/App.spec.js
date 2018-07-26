import React from 'react';
import { shallow } from 'enzyme';
import firebase from 'react-native-firebase';
import { Linking } from 'react-native';
import configureStore from 'redux-mock-store';
// import moduleName from '../../navigation/RootNavigator';

import ConnectedApp from '.';
import * as actions from '../../redux/actions';

// jest.mock('../../navigation/RootNavigator', () => 'Test');

describe('App component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    userSettings: {
      name: 'Test Name',
      currentFlockId: 'Flock1',
      flocks: {
        XYZ123: true,
        XYZ124: true,
      },
    },
  });
  const getWrapper = () => shallow(<ConnectedApp store={store} />).dive();
  let onAuthStateChangedMock = jest.fn();

  beforeEach(() => {
    onAuthStateChangedMock = jest.fn();
    firebase.auth = jest.fn(() => ({
      onAuthStateChanged: onAuthStateChangedMock,
    }));

    store.dispatch = jest.fn(() => Promise.resolve());
  });

  test('Should render Splash when not initialized', () => {
    onAuthStateChangedMock = jest.fn();
    const wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render Root Navigator when initialized', () => {
    onAuthStateChangedMock = jest.fn(cb => cb(null));
    const wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch listenToUserSettings action when logged in', (done) => {
    const uid = 'test123';
    const expectedAction = actions.listenToUserSettings(uid);
    onAuthStateChangedMock = jest.fn(cb => cb({ uid }));

    const promise = new Promise((resolve) => {
      store.dispatch = jest.fn(() => resolve());
      getWrapper();
    });
    promise.then(() => {
      expect(store.dispatch).toBeCalledWith(expectedAction);
      done();
    });
  });

  test('should dispatch setInitialUrl when initialUrl is set', (done) => {
    const initialUrl = 'test://url';
    const expectedAction = actions.setInitialUrl(initialUrl);
    Linking.getInitialURL = jest.fn(() => Promise.resolve(initialUrl));

    const promise = new Promise((resolve) => {
      store.dispatch = jest.fn(() => resolve());
      shallow(<ConnectedApp store={store} />).dive();
    });

    promise.then(() => {
      expect(store.dispatch).toBeCalledWith(expectedAction);
      done();
    });
  });

  test('should not dispatch when no initialUrl is set', (done) => {
    Linking.getInitialURL = jest.fn(() => Promise.resolve(null));
    const promise = new Promise((resolve) => {
      store.dispatch = jest.fn(() => Promise.resolve());

      shallow(<ConnectedApp store={store} />).dive();
      setImmediate(resolve);
    });

    promise.then(() => {
      expect(store.dispatch).not.toBeCalled();
      done();
    });
  });
});
