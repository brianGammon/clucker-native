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
          name: 'Chicken1',
          breed: 'Maran',
        },
        chicken2: {
          name: 'Chicken1',
          breed: 'Maran',
        },
      },
    },
    flocks: {
      data: {
        flock1: {
          name: 'Test Flock',
          ownedBy: 'user1',
        },
        flock2: {
          name: 'Test Flock 2',
          ownedBy: 'user2',
        },
      },
    },
    userSettings: {
      key: 'user1',
      data: {
        currentFlockId: 'flock1',
      },
    },
  };
  const store = mockStore(sampleData);

  test('Should render connected component as flock owner', () => {
    const navigation = {};
    const wrapper = shallow(
      <Flock store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render connected component as flock guest', () => {
    const navigation = {};
    const data = { ...sampleData };
    data.userSettings.key = 'user2';
    const thisStore = mockStore(data);
    const wrapper = shallow(
      <Flock store={thisStore} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render FlockRenderer as flock owner', () => {
    const navigation = jest.fn();
    const chickens = sampleData.chickens.data;
    const flock = sampleData.flocks.data.flock2;
    const wrapper = shallow(
      <FlockRenderer
        navigation={navigation}
        chickens={chickens}
        flock={flock}
        isFlockOwner
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render FlockRenderer not as flock owner', () => {
    const navigation = jest.fn();
    const chickens = sampleData.chickens.data;
    const flock = sampleData.flocks.data.flock2;
    const wrapper = shallow(
      <FlockRenderer
        navigation={navigation}
        chickens={chickens}
        flock={flock}
        isFlockOwner={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
