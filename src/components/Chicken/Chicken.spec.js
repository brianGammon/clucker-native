import React from 'react';
import configureStore from 'redux-mock-store';
import Chicken from '.';

describe('Chicken component:', () => {
  let paramReturned = 'chicken1';
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    chickens: {
      data: {
        chicken1: {
          name: 'The First Chicken',
        },
        chicken2: {
          name: 'The Second Chicken',
        },
      },
    },
    eggs: {
      data: {
        egg1: {
          chickenId: 'chicken1',
          chickenName: 'Bossie',
          damaged: false,
          date: '2018-08-01',
          modified: '2018-01-12T18:05:54.806Z',
          notes:
            'This was the record setting egg from May 2017, real egg was 66.1g on this day',
          userId: 'MVQUEcoTaVUhUdo2ZS0zsIE6tn93',
          weight: 88.1,
        },
        egg2: {
          chickenId: 'chicken2',
          chickenName: 'Baby',
          damaged: false,
          date: '2017-09-24',
          modified: '2017-10-12T18:05:54.806Z',
          userId: 'MVQUEcoTaVUhUdo2ZS0zsIE6tn93',
          weight: 88.1,
        },
        egg3: {
          chickenId: 'chicken1',
          chickenName: 'Bossie',
          damaged: false,
          date: '2018-08-02',
          modified: '2018-08-02T18:05:54.806Z',
          notes: '',
          userId: 'MVQUEcoTaVUhUdo2ZS0zsIE6tn93',
          weight: 68.1,
        },
      },
    },
  });

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
});
