import React from 'react';
import FlockStack from '../FlockStack';

test('FlockStack renders', () => {
  const wrapper = shallow(<FlockStack />);
  expect(wrapper).toBeTruthy();
});
