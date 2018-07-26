import React from 'react';
import CalendarDay from '.';

describe('CalendarDay component:', () => {
  test('Should render correctly', () => {
    const wrapper = shallow(<CalendarDay />);
    expect(wrapper).toMatchSnapshot();
  });
});
