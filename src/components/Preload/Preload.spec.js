import React from 'react';
import Preload from '.';

describe('Preload component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<Preload />);
    expect(wrapper).toMatchSnapshot();
  });
});
