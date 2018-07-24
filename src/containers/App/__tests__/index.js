import React from 'react';
import { shallow } from 'enzyme';
import firebase from 'react-native-firebase';
import { Linking } from 'react-native';
import { App } from '..';

jest.mock('../../../navigation/RootNavigator', () => 'Test');

describe('App component shallow', () => {
  test('Not initialized', () => {
    // Don't return anything from onAuthStateChanged to simulate waiting on Firebase
    const onAuthStateChangedMock = jest.fn();
    firebase.auth = jest.fn(() => ({
      onAuthStateChanged: onAuthStateChangedMock,
    }));
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Not logged in', () => {
    const onAuthStateChangedMock = jest.fn(cb => cb(null));
    firebase.auth = jest.fn(() => ({
      onAuthStateChanged: onAuthStateChangedMock,
    }));
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Logged in', () => {
    const listenToUserSettingsMock = jest.fn();
    const onAuthStateChangedMock = jest.fn(cb => cb({ uid: 'Test123' }));
    firebase.auth = jest.fn(() => ({
      onAuthStateChanged: onAuthStateChangedMock,
    }));
    const wrapper = shallow(<App listenToUserSettings={listenToUserSettingsMock} />);
    expect(wrapper).toMatchSnapshot();
    expect(listenToUserSettingsMock).toBeCalledWith('Test123');
  });

  test('initial Url is set', (done) => {
    let setInitialUrlMock = jest.fn();
    const promise = new Promise((resolve) => {
      setInitialUrlMock = jest.fn(() => resolve());
      firebase.auth = jest.fn(() => ({
        onAuthStateChanged: jest.fn(),
      }));
      Linking.getInitialURL = jest.fn(() => Promise.resolve('test://url'));
      shallow(<App setInitialUrl={setInitialUrlMock} />);
    });

    promise.then(() => {
      expect(setInitialUrlMock).toBeCalledWith('test://url');
      done();
    });
  });

  test('initial Url not set', (done) => {
    const setInitialUrlMock = jest.fn();
    const promise = new Promise((resolve) => {
      firebase.auth = jest.fn(() => ({
        onAuthStateChanged: jest.fn(),
      }));
      Linking.getInitialURL = jest.fn(() => {
        resolve();
        return Promise.resolve();
      });
      shallow(<App setInitialUrl={setInitialUrlMock} />);
    });

    promise.then(() => {
      expect(setInitialUrlMock).not.toBeCalled();
      done();
    });
  });
});
