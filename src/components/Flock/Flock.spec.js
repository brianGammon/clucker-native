import React from 'react';
import { Flock } from './Flock';
import FlockRenderer from './FlockRenderer';

describe('Flock component:', () => {
  test('Should render connected component', () => {
    const navigation = jest.fn();
    const chickens = {};
    const wrapper = shallow(<Flock navigation={navigation} chickens={chickens} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render FlockRenderer', () => {
    const navigation = jest.fn();
    const chickens = {};
    const wrapper = shallow(<FlockRenderer navigation={navigation} chickens={chickens} />);
    expect(wrapper).toMatchSnapshot();
  });
});
