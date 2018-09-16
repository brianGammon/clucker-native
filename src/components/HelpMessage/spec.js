import React from 'react';
import HelpMessage from '.';

describe('HelpMessage', () => {
  test('renders with default message', () => {
    const wrapper = shallow(<HelpMessage />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with message prop', () => {
    const wrapper = shallow(<HelpMessage message="Passed in message" />);
    expect(wrapper).toMatchSnapshot();
  });
});
