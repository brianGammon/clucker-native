import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/sampleData';
import Chicken from '.';
import ChickenRenderer from './ChickenRenderer';

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
    paramReturned = 'chicken3';
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
        stats: {
          total: 0,
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

    test('ChickenRenderer should render correctly when no stats yet', () => {
      const { stats } = props;
      const { heaviest, ...rest } = stats;
      props.stats = { ...rest };
      paramReturned = 'chicken1';
      const wrapper = shallow(
        <ChickenRenderer navigation={navigation} {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('ChickenRenderer should render correctly when stats available', () => {
      paramReturned = 'chicken1';
      console.log(props);
      const wrapper = shallow(
        <ChickenRenderer navigation={navigation} {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
