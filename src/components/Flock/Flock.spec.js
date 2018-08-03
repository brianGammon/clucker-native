import React from 'react';
import configureStore from 'redux-mock-store';
import Flock from './Flock';
import FlockRenderer from './FlockRenderer';

describe('Flock component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const sampleData = {
    chickens: {
      items: {
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
      items: {
        flock1: {
          name: 'Test Flock',
        },
        flock2: {
          name: 'Test Flock 2',
        },
      },
    },
    userSettings: {
      items: {
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
    const chickens = sampleData.chickens.items;
    const flock = sampleData.flocks.items.flock2;
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
