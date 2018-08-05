import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/sampleData';
import ChickenEditor from '.';

describe('ChickenEditor component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);
  let paramReturned = 'chicken1';
  const navigation = {
    getParam: jest.fn((param, defaultId) => {
      if (paramReturned) {
        return paramReturned;
      }
      return defaultId;
    }),
  };

  test('Should render in edit mode', () => {
    const wrapper = shallow(
      <ChickenEditor store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render in add new mode', () => {
    paramReturned = null;
    const wrapper = shallow(
      <ChickenEditor store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
