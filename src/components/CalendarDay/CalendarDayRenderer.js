/* @flow */
import * as React from 'react';
import { Container, Content } from 'native-base';
import { FlatList } from 'react-native';
import { type Egg } from '../../types';
import Header from '../Header';
import DateSwitcher from '../DateSwitcher';
import Line from '../Line';
import EggItem from './EggItem';

type Props = {
  navigation: any,
  currentFlockId: string,
  dates: {
    date: string,
    previousDate: string,
    nextDate?: string,
  },
  eggs: {
    [eggId: string]: Egg,
  },
  handleMoreOptions: (eggId: string) => void,
};

const CalendarDayRenderer = ({
  navigation,
  currentFlockId,
  eggs,
  dates,
  handleMoreOptions,
}: Props) => (
  <Container>
    <Header
      title="Egg List"
      eggButton={!!currentFlockId}
      goBackButton="Month"
    />
    <Content padder>
      <DateSwitcher
        mode="day"
        navigation={navigation}
        dates={dates}
        eggCount={Object.keys(eggs || {}).length}
      />
      <Line />
      <FlatList
        data={Object.keys(eggs || {})}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <EggItem
            item={item}
            eggs={eggs}
            handleMoreOptions={handleMoreOptions}
          />
        )}
      />
    </Content>
  </Container>
);

export default CalendarDayRenderer;
