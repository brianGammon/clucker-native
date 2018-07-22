import React from 'react';
import { shallow } from 'enzyme';
import firebase from 'react-native-firebase';
import { App } from '..';

jest.mock('../../../navigation/RootNavigator', () => 'Test');

describe('App component shallow', () => {
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
    expect(listenToUserSettingsMock).toHaveBeenCalledWith('Test123');
  });
});
