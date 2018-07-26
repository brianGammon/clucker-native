import React from 'react';
import Settings from '.';

describe('Settings component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });
});
