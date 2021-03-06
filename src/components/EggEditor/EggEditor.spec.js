import React from 'react';
import configureStore from 'redux-mock-store';
import EggEditor from '.';
import mockNavigation from '../../../jest/mockNavigation';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import '../../../jest/mockDateHelper';

describe('EggEditor component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('Should render connected EggEditor with default chicken, egg, and date', () => {
    const paramReturned = {
      getParam: {
        chickenId: 'chicken1',
        date: '2018-02-10',
        eggId: '-L4geyAR0BkMrAjiF7NZ',
      },
    };
    const navigation = mockNavigation(paramReturned);
    const wrapper = shallow(
      <EggEditor store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render connected EggEditor with no defaults', () => {
    const paramReturned = {};
    const navigation = mockNavigation(paramReturned);
    const wrapper = shallow(
      <EggEditor store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
