import React from 'react';
import CalendarStack from '../CalendarStack';

test('CalendarStack renders', () => {
  const wrapper = shallow(<CalendarStack />);
  expect(wrapper).toBeTruthy();
});
