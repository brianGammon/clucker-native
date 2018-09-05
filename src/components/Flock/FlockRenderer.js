import React from 'react';
import {
  Container,
  View,
  Text,
  Content,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Icon,
} from 'native-base';
import { FlatList } from 'react-native';
import FlockItem from './FlockItem';
import NoChickens from './NoChickens';
import FlockHeader from './FlockHeader';
import { type Chicken, type Navigation, type Flock } from '../../types';
import styles from './styles';

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
    <FlockHeader flock={flock} chickens={chickens} />
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
      {/* {isFlockOwner && (
        <Button onPress={() => navigation.navigate('ChickenEditor')}>
          <Text>Add a Chicken</Text>
        </Button>
      )} */}
    </Content>
  </Container>
);

export default FlockRenderer;
