import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/no-flocks.json';
import ResetPassword from '.';
import ResetPasswordRenderer from './ResetPasswordRenderer';

describe('ResetPassword component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);
  test('Should render', () => {
    const wrapper = shallow(<ResetPassword store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('ResetPasswordRenderer renders when no error or success message', () => {
    const wrapper = shallow(
      <ResetPasswordRenderer
        email="test@exmaple.com"
        error=""
        successMessage=""
        handleSendPasswordResetEmail={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('ResetPasswordRenderer renders when success message, no error', () => {
    const wrapper = shallow(
      <ResetPasswordRenderer
        email="test@exmaple.com"
        error=""
        successMessage="Check your inbox for an email."
        handleSendPasswordResetEmail={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('ResetPasswordRenderer renders with error message, no success message', () => {
    const wrapper = shallow(
      <ResetPasswordRenderer
        email="test@exmaple.com"
        error="Some error occurred"
        successMessage=""
        handleSendPasswordResetEmail={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('ResetPasswordRenderer renders with both error and success message', () => {
    const wrapper = shallow(
      <ResetPasswordRenderer
        email="test@exmaple.com"
        error="Some error occurred"
        successMessage="Check your inbox for an email."
        handleSendPasswordResetEmail={() => {}}
        handleChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
