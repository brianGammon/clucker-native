import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import Preload from '.';

describe('Preload component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('Should render', () => {
    const navigation = {
      navigate: () => {},
    };
    const wrapper = shallow(<Preload navigation={navigation} store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});
