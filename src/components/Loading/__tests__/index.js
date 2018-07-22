import React from 'react';
import { shallow } from 'enzyme';
import Loading from '..';

describe('Testing ReassignLocationMenu component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ message: 'with a message' });
    expect(wrapper).toMatchSnapshot();
  });
});
