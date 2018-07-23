import React from 'react';
import { Flock } from './Flock';
import FlockRenderer from './FlockRenderer';

test('Flock container renders', () => {
  const navigation = jest.fn();
  const chickens = {};
  const wrapper = shallow(<Flock navigation={navigation} chickens={chickens} />);
  expect(wrapper).toMatchSnapshot();
});

test('FlockRenderer renders', () => {
  const navigation = jest.fn();
  const chickens = {};
  const wrapper = shallow(<FlockRenderer navigation={navigation} chickens={chickens} />);
  expect(wrapper).toMatchSnapshot();
});
