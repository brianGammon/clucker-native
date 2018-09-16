import React from 'react';
import { Container, Content } from 'native-base';
import { FlatList } from 'react-native';
import FlockItem from './FlockItem';
import NoChickens from './NoChickens';
import FlockHeader from './FlockHeader';
import Header from '../Header';
import Line from '../Line';
import { type Chicken, type Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  topProducer: string,
};

const FlockRenderer = ({ navigation, chickens, topProducer }: Props) => (
  <Container>
    <Header title="Flock" eggButton />
    <FlockHeader chickens={chickens} navigation={navigation} />
    <Line />
    <Content>
      {Object.keys(chickens || {}).length === 0 && (
        <NoChickens navigation={navigation} />
      )}
      <FlatList
        data={Object.keys(chickens || {})}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FlockItem
            item={item}
            navigation={navigation}
            topProducer={topProducer}
            chickens={chickens}
          />
        )}
      />
    </Content>
  </Container>
);

export default FlockRenderer;
