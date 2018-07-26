import React from 'react';
import Calendar from '.';

describe('Calender component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toMatchSnapshot();
  });
});
