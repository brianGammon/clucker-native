import React from 'react';
import HeaderEgg from '.';

describe('HeaderEgg component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<HeaderEgg />);
    expect(wrapper).toMatchSnapshot();
  });
});
