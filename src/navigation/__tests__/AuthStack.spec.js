import React from 'react';
import AuthStack from '../AuthStack';

test('AuthStack renders', () => {
  const wrapper = shallow(<AuthStack />);
  expect(wrapper).toBeTruthy();
});
