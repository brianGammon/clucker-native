import React from 'react';
import { Header } from './Header';

describe('Header', () => {
  test('renders with default title, eggButton and goBack button', () => {
    const wrapper = shallow(<Header eggButton goBackButton="Go Back" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with title set, and cancel button', () => {
    const wrapper = shallow(<Header title="Test Title" cancelButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
