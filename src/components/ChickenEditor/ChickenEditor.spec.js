import React from 'react';
import ChickenEditor from '.';

describe('ChickenEditor component:', () => {
  test('Should render', () => {
    const wrapper = shallow(<ChickenEditor />);
    expect(wrapper).toMatchSnapshot();
  });
});
