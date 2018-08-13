import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/no-flocks.json';
import SignIn from '.';
import SignInRenderer from './SignInRenderer';

describe('SignIn component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);
  test('Should render', () => {
    const wrapper = shallow(<SignIn store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('SignInRenderer renders when no error message', () => {
    const wrapper = shallow(
      <SignInRenderer
        navigation={() => {}}
        email=""
        password=""
        error=""
        handleSignIn={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('SignInRenderer renders with error message', () => {
    const wrapper = shallow(
      <SignInRenderer
        navigation={() => {}}
        email=""
        password=""
        error="Some error occurred"
        handleSignIn={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
