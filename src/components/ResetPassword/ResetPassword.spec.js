import React from 'react';
import ResetPassword from '.';

describe('ResetPassword component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
