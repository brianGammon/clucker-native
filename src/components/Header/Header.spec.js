import React from 'react';
import { Header } from './Header';
import mockNavigation from '../../../jest/mockNavigation';

describe('Header', () => {
  const navigation = mockNavigation({
    getParams: {
      chickenId: 'chicken1',
      date: '2018-08-05',
    },
  });
  test('renders with default title, eggButton and goBack button', () => {
    const wrapper = shallow(
      <Header navigation={navigation} eggButton goBackButton="Go Back" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with title set, and cancel button', () => {
    const wrapper = shallow(
      <Header navigation={navigation} title="Test Title" cancelButton />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
