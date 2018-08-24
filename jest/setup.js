/* eslint-disable import/no-extraneous-dependencies */
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// ReferenceError: window is not defined caused by react-reactive-form
// https://github.com/algolia/react-instantsearch/issues/609
if (typeof window !== 'object') {
  global.window = global;
}

global.shallow = shallow;
global.mount = mount;

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(() => Promise.resolve()),
}));
