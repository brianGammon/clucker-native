import React from 'react';
import Separator from '.';

describe('Separator', () => {
  test('renders with text', () => {
    const wrapper = shallow(<Separator text="Test Message" />);
    expect(wrapper).toMatchSnapshot();
  });
});
