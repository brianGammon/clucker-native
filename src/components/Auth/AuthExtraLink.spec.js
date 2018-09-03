import React from 'react';
import AuthExtraLink from './AuthExtraLink';

describe('AuthExtraLink', () => {
  test('renders', () => {
    const wrapper = shallow(
      <AuthExtraLink
        message="test message"
        buttonText="some text"
        handlePress={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
