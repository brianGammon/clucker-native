import React from 'react';
import NoStats from '.';

describe('NoStats', () => {
  test('renders with default message', () => {
    const wrapper = shallow(<NoStats />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with message prop', () => {
    const wrapper = shallow(<NoStats message="Passed in message" />);
    expect(wrapper).toMatchSnapshot();
  });
});
