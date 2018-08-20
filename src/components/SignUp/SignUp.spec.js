import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/no-flocks.json';
import SignUp from '.';
import SignUpRenderer from './SignUpRenderer';

describe('SignUp component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);
  test('Should render', () => {
    const wrapper = shallow(<SignUp store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('SignUpRenderer renders when no error message', () => {
    const wrapper = shallow(
      <SignUpRenderer
        navigation={() => {}}
        email=""
        password=""
        error=""
        handleSignUp={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('SignUpRenderer renders with error message', () => {
    const wrapper = shallow(
      <SignUpRenderer
        navigation={() => {}}
        email=""
        password=""
        error="Some error occurred"
        handleSignUp={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
