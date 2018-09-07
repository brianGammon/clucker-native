/* @flow */
import * as React from 'react';
import {
  Text, View, Container, Content, Button,
} from 'native-base';
import { type Egg } from '../../types';
import Header from '../Header';
import DateSwitcher from '../DateSwitcher';
import styles from './styles';

type Props = {
  navigation: any,
  dates: {
    date: string,
    previousDate: string,
    nextDate?: string,
  },
  eggs: {
    [eggId: string]: Egg,
  },
  onDeleteEgg: (eggId: string) => void,
};

const CalendarDayRenderer = ({
  navigation,
  eggs,
  dates,
  onDeleteEgg,
}: Props) => (
  <Container>
    <Header title="Eggs For Day" eggButton goBackButton="Month" />
    <Content padder>
      <DateSwitcher
        mode="day"
        navigation={navigation}
        dates={dates}
        eggCount={Object.keys(eggs || {}).length}
      />
      <View>
        {Object.keys(eggs || {}).map(key => (
          <View key={key} style={styles.dayContainer}>
            <View style={styles.dayContainerRow}>
              <View style={{ flex: 1, borderWidth: 1 }}>
                <Text>{eggs[key].chickenName}</Text>
                <Text>{eggs[key].weight || '-- g'}</Text>
                <Text>{eggs[key].notes}</Text>
                <Text>
                  {eggs[key].damaged ? eggs[key].damaged.toString() : 'false'}
                </Text>
              </View>
              <View>
                <Button
                  transparent
                  onPress={() => navigation.navigate('EggEditor', { eggId: key })
                  }
                >
                  <Text>Edit</Text>
                </Button>
                <Button transparent onPress={() => onDeleteEgg(key)}>
                  <Text>Delete</Text>
                </Button>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Content>
  </Container>
);

export default CalendarDayRenderer;
