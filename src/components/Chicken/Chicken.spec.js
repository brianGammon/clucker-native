import React from 'react';
import Chicken from '.';

describe('Chicken component:', () => {
  const navigation = {
    getParam: jest.fn((param, defaultId) => {
      if (param === 'chickenId') {
        return 'chicken1';
      }
      return defaultId;
    }),
  };

  test('Should render correctly when chicken ID passed in', () => {
    const wrapper = shallow(<Chicken navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
