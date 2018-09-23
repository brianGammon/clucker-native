/* @flow */
import * as React from 'react';
import { Container, Content } from 'native-base';
import { FlatList } from 'react-native';
import { type Egg, type Chicken } from '../../types';
import Header from '../Header';
import DateSwitcher from '../DateSwitcher';
import Line from '../Line';
import EggItem from './EggItem';
import { UNNAMED_HEN_LABEL } from '../../constants';

type Props = {
  navigation: any,
  dates: {
    now: string,
    date: string,
    previousDate: string,
    nextDate?: string,
  },
  eggs: {
    [eggId: string]: Egg,
  },
  count: number,
  chickens: {
    [chickenId: string]: Chicken,
  },
  handleMoreOptions: (eggId: string, bulkMode: boolean) => void,
};

const CalendarDayRenderer = ({
  navigation,
  eggs,
  chickens,
  dates,
  handleMoreOptions,
  count,
}: Props) => (
  <Container>
    <Header title="Daily Log" eggButton goBackButton="Month" />
    <Content padder>
      <DateSwitcher
        mode="day"
        navigation={navigation}
        dates={dates}
        eggCount={count}
      />
      <Line />
      <FlatList
        data={Object.keys(eggs || {})}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <EggItem
            item={item}
            chickenName={
              (chickens[eggs[item].chickenId]
                && chickens[eggs[item].chickenId].name)
              || UNNAMED_HEN_LABEL
            }
            egg={eggs[item]}
            handleMoreOptions={handleMoreOptions}
          />
        )}
      />
    </Content>
  </Container>
);

export default CalendarDayRenderer;
