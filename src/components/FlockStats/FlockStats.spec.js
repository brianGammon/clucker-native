import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import FlockStats from './FlockStats';
import FlockStatsRenderer from './FlockStatsRenderer';

describe('FlockStats component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('FlockStats connected component renders', () => {
    const navigation = {};
    const wrapper = shallow(
      <FlockStats store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('FlockStatsRenderer renders', () => {
    const mockStats = {
      total: 100,
      heaviest: null,
      averageWeight: 60,
      averageNumber: 2,
      mostEggs: 'chicken1',
      eggsPerChicken: {
        chicken1: 10,
        chicken2: 8,
      },
      eggsPerPeriod: {
        '2018-08': {
          total: 10,
          byChicken: {
            chicken1: 5,
          },
        },
      },
    };
    const wrapper = shallow(
      <FlockStatsRenderer
        stats={mockStats}
        chickens={sampleData.chickens.data}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
