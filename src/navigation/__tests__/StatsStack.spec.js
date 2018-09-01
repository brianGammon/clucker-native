import React from 'react';
import StatsStack from '../StatsStack';

test('StatsStack renders', () => {
  const wrapper = shallow(<StatsStack />);
  expect(wrapper).toBeTruthy();
});
