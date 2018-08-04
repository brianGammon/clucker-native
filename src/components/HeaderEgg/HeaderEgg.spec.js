import React from 'react';
import HeaderEgg from '.';

describe('HeaderEgg component:', () => {
  const paramReturned = 'chicken1';
  const navigation = {
    getParam: jest.fn((param, defaultId) => {
      if (paramReturned) {
        return paramReturned;
      }
      return defaultId;
    }),
  };
  test('Should render', () => {
    const wrapper = shallow(<HeaderEgg navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
