import React from 'react';
import { Tabs } from '../AppTabs';

test('AppTabs renders', () => {
  const wrapper = shallow(<Tabs />);
  expect(wrapper).toBeTruthy();
});
