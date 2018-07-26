import React from 'react';
import HeaderProfile from '.';

describe('HeaderProfile component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<HeaderProfile />);
    expect(wrapper).toMatchSnapshot();
  });
});
