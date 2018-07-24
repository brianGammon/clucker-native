import React from 'react';
import RootNavigator from '../RootNavigator';

test('RootNavigator renders', () => {
  const wrapper = shallow(<RootNavigator />);
  expect(wrapper).toBeTruthy();
});
