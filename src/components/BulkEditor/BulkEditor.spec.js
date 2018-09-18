import React from 'react';
import configureStore from 'redux-mock-store';
import BulkEditor from '.';
import mockNavigation from '../../../jest/mockNavigation';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import '../../../jest/mockDateHelper';

describe('BulkEditor component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('Should render connected BulkEditor with default chicken, egg, and date', () => {
    const paramReturned = {
      getParam: {
        chickenId: 'chicken1',
        date: '2018-02-10',
        eggId: '-L4geyAR0BkMrAjiF7NZ',
      },
    };
    const navigation = mockNavigation(paramReturned);
    const wrapper = shallow(
      <BulkEditor store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render connected BulkEditor with no defaults', () => {
    const paramReturned = {};
    const navigation = mockNavigation(paramReturned);
    const wrapper = shallow(
      <BulkEditor store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
