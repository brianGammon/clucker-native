import React from 'react';
import Drawer from '.';

describe('Drawer component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<Drawer />);
    expect(wrapper).toMatchSnapshot();
  });
});
