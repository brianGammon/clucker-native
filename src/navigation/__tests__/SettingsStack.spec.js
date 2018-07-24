import React from 'react';
import SettingsStack from '../SettingsStack';

test('SettingsStack renders', () => {
  const wrapper = shallow(<SettingsStack />);
  expect(wrapper).toBeTruthy();
});
