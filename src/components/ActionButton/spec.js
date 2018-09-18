import React from 'react';
import mockNavigation from '../../../jest/mockNavigation';
import ActionButton from '.';

describe('ActionButton', () => {
  const navigation = mockNavigation({
    getParams: {
      chickenId: 'chicken1',
      date: '2018-08-05',
    },
  });
  test('renders', () => {
    const wrapper = shallow(<ActionButton navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
