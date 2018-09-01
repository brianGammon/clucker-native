import React from 'react';
import Preload from '.';

describe('Preload component:', () => {
  test('Should render', () => {
    const navigation = {
      navigate: () => {},
    };
    const wrapper = shallow(<Preload navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
