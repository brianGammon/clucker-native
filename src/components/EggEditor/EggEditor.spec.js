import React from 'react';
import EggEditor from '.';

describe('EggEditor component:', () => {
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
    const wrapper = shallow(<EggEditor navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
