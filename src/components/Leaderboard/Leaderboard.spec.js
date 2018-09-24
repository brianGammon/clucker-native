import React from 'react';
import Leaderboard from '.';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';

describe('Leaderboard', () => {
  const stats = {
    eggsPerChicken: {
      chicken1: 3,
      chicken2: 2,
      unknown: 2,
      chicken3: 1,
    },
  };
  const chickens = sampleData.chickens.data;
  test('renders', () => {
    const wrapper = shallow(
      <Leaderboard stats={stats} chickens={chickens} mode="month" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('renders nothing when only bulk eggs logged', () => {
    const wrapper = shallow(
      <Leaderboard stats={{ eggsPerChicken: {} }} chickens={{}} mode="month" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
