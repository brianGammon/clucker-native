import React from 'react';
import AuthHeader from './AuthHeader';

describe('AuthHeader', () => {
  test('renders', () => {
    const wrapper = shallow(<AuthHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
