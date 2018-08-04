import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/sampleData';
import Chicken from '.';

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
});
