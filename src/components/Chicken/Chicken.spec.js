import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import Chicken from '.';
import ChickenRenderer from './ChickenRenderer';
import '../../../jest/mockDateHelper';

describe('Chicken component:', () => {
  let paramReturned = 'chicken1';
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  const navigation = {
    getParam: jest.fn((param, defaultId) => {
      if (paramReturned) {
        return paramReturned;
      }
      return defaultId;
    }),
  };

  test('Should render correctly when chicken ID passed in', () => {
    paramReturned = 'chicken1';
    const wrapper = shallow(
      <Chicken store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render correctly when no chicken ID passed in', () => {
    paramReturned = null;
    const wrapper = shallow(
      <Chicken store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render correctly when chicken not found', () => {
    paramReturned = 'chicken5';
    const wrapper = shallow(
      <Chicken store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  describe('ChickenRenderer test', () => {
    let props = {};
    beforeEach(() => {
      props = {
        chickenId: 'chicken1',
        prevChickenId: null,
        nextChickenId: 'chicken2',
        chicken: sampleData.chickens.data.chicken1,
        showModal: true,
        toggleModal: () => {},
        stats: {
          total: 1,
          heaviest: {
            weight: 88.1,
            date: '2017-04-02',
          },
          longestStreak: 0,
          lastSevenDays: {
            '2018-10-06': 1,
          },
        },
      };
    });

    test('ChickenRenderer should render correctly when no weight yet', () => {
      const { stats } = props;
      const { heaviest, ...rest } = stats;
      props.stats = { ...rest };
      paramReturned = 'chicken1';
      const wrapper = shallow(
        <ChickenRenderer navigation={navigation} {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('ChickenRenderer should render correctly when no stats yet', () => {
      const { stats, ...rest } = props;
      props = { ...rest, stats: {} };
      paramReturned = 'chicken1';
      const wrapper = shallow(
        <ChickenRenderer navigation={navigation} {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('ChickenRenderer should render correctly with all stats available', () => {
      paramReturned = 'chicken1';
      const wrapper = shallow(
        <ChickenRenderer navigation={navigation} {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
