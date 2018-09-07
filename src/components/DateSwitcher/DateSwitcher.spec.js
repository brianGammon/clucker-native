import React from 'react';
import DateSwitcher from '.';

describe('DateSwitcher', () => {
  const navigation = {
    navigate: () => {},
  };
  const dates = {
    date: '2018-05',
    prevDate: '20018-04',
    nextDate: '20018-06',
  };
  test('renders in month mode', () => {
    const wrapper = shallow(
      <DateSwitcher
        navigation={navigation}
        dates={dates}
        mode="month"
        eggCount={20}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('renders in day mode', () => {
    dates.date = '2018-05-05';
    dates.prevDate = '2018-05-04';
    dates.nextDate = '2018-05-06';

    const wrapper = shallow(
      <DateSwitcher
        navigation={navigation}
        dates={dates}
        mode="day"
        eggCount={20}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
