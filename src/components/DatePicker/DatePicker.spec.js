import React from 'react';
import DatePicker from '.';

describe('DatePicker', () => {
  const props = {
    clearable: true,
    value: new Date('8/31/2018'),
    maximumDate: new Date('12/31/2018'),
    onDateChange: () => {},
  };
  test('renders with all props supplied', () => {
    const wrapper = shallow(<DatePicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
