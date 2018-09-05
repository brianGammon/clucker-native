import React from 'react';
import { Container, Content } from 'native-base';
import { FlatList } from 'react-native';
import FlockItem from './FlockItem';
import NoChickens from './NoChickens';
import FlockHeader from './FlockHeader';
import { type Chicken, type Navigation, type Flock } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  flock: Flock,
  isFlockOwner: boolean,
  topProducer: string,
};

const FlockRenderer = ({
  navigation,
  chickens,
  flock,
  isFlockOwner,
  topProducer,
}: Props) => (
  <Container>
    <FlockHeader
      flock={flock}
      chickens={chickens}
      isFlockOwner={isFlockOwner}
      navigation={navigation}
    />
    <Content>
      {Object.keys(chickens || {}).length === 0 && (
        <NoChickens navigation={navigation} isFlockOwner={isFlockOwner} />
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
