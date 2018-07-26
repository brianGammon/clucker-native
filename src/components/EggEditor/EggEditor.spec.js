import React from 'react';
import EggEditor from '.';

describe('EggEditor component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<EggEditor />);
    expect(wrapper).toMatchSnapshot();
  });
});
