import React from 'react';
import ModalStack from '../ModalStack';

test('ModalStack renders', () => {
  const wrapper = shallow(<ModalStack />);
  expect(wrapper).toBeTruthy();
});
