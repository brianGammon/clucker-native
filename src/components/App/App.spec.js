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
  let onAuthStateChangedVal = null;
  let onAuthStateChangedMock = jest.fn();
  const onAuthStateChangedUnsub = jest.fn();

  beforeEach(() => {
    onAuthStateChangedMock = jest.fn((cb) => {
      cb(onAuthStateChangedVal);
      return onAuthStateChangedUnsub;
    });

    firebase.auth = jest.fn(() => ({
      onAuthStateChanged: onAuthStateChangedMock,
    }));

    store.dispatch = jest.fn(() => Promise.resolve());
  });

  test('Should render Splash when not initialized', () => {
    onAuthStateChangedMock = jest.fn();
    const wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().componentWillUnmount();
    expect(onAuthStateChangedUnsub).not.toBeCalled();
  });

  test('Should render Root Navigator when initialized', () => {
    onAuthStateChangedVal = null;
    const wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should unsubscribe auth listener', () => {
    onAuthStateChangedVal = null;
    const wrapper = getWrapper();
    wrapper.instance().componentWillUnmount();
    expect(Linking.removeEventListener).toBeCalled();
    expect(onAuthStateChangedUnsub).toBeCalled();
  });

  test('Should dispatch listenToUserSettings action when logged in', (done) => {
    const uid = 'test123';
    const expectedAction = actions.listenToUserSettings(uid);
    onAuthStateChangedVal = { uid };

    const promise = new Promise((resolve) => {
      store.dispatch = jest.fn(() => resolve());
      getWrapper();
    });
    promise.then(() => {
      expect(store.dispatch).toBeCalledWith(expectedAction);
      done();
    });
  });

  test('Should dispatch setInitialUrl when initialUrl is set', (done) => {
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

  test('Should not dispatch when no initialUrl is set', (done) => {
    Linking.getInitialURL = jest.fn(() => Promise.resolve(null));
    onAuthStateChangedVal = null;
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
