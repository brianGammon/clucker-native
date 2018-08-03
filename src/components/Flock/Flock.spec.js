import React from 'react';
import configureStore from 'redux-mock-store';
import Flock from './Flock';
import FlockRenderer from './FlockRenderer';

describe('Flock component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const sampleData = {
    chickens: {
      data: {
        chicken1: {
          name: 'Bossie',
          breed: 'Maran',
        },
        chicken2: {
          name: 'Bossie',
          breed: 'Maran',
        },
      },
    },
    flocks: {
      data: {
        flock1: {
          name: 'Test Flock',
        },
        flock2: {
          name: 'Test Flock 2',
        },
      },
    },
    userSettings: {
      data: {
        currentFlockId: 'flock1',
      },
    },
  };
  const store = mockStore(sampleData);

  test('Should render connected component', () => {
    const navigation = {};
    const wrapper = shallow(
      <Flock store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render FlockRenderer', () => {
    const navigation = jest.fn();
    const chickens = sampleData.chickens.data;
    const flock = sampleData.flocks.data.flock2;
    const wrapper = shallow(
      <FlockRenderer
        navigation={navigation}
        chickens={chickens}
        flock={flock}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
