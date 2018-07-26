import React from 'react';
import SignUp from '.';

describe('SignUp component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper).toMatchSnapshot();
  });
});
