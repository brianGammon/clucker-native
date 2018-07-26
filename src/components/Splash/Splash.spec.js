import React from 'react';
import Splash from '.';

describe('Splash component:', () => {
  test('Should render correctly', () => {
    const wrapper = shallow(<Splash />);
    expect(wrapper).toMatchSnapshot();
  });
});
