import React from 'react';
import SignIn from '.';

describe('SignIn component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
  });
});
