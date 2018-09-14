import React from 'react';
import FlockManager from '.';

describe('FlockManager', () => {
  test('renders with flocks', () => {
    const wrapper = shallow(<FlockManager hasFlocks />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders without flocks', () => {
    const wrapper = shallow(<FlockManager hasFlocks={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
