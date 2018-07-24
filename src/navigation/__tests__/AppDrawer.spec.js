import React from 'react';
import AppDrawer from '../AppDrawer';

test('AppDrawer renders', () => {
  const wrapper = shallow(<AppDrawer />);
  expect(wrapper).toBeTruthy();
});
