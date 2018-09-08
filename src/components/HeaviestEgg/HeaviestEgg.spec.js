import React from 'react';
import HeaviestEgg from '.';

describe('HeaviestEgg', () => {
  const heaviest = {
    chickenName: 'Bossie',
    chickenId: 'chicken1',
    weight: '66.6',
    date: '2018-08-01',
  };
  test('renders', () => {
    const wrapper = shallow(<HeaviestEgg heaviest={heaviest} />);
    expect(wrapper).toMatchSnapshot();
  });
});
