import React from 'react';
import { Container, Content, View } from 'native-base';
import { FlatList } from 'react-native';
import FlockItem from './FlockItem';
import HelpMessage from '../HelpMessage';
import NoChickens from './NoChickens';
import Header from '../Header';
import { type Chicken, type Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
};

const FlockRenderer = ({ navigation, chickens }: Props) => (
  <Container>
    <Header title="My Flock" eggButton />
    <Content>
      {Object.keys(chickens || {}).length === 0 && (
        <View padder>
          <HelpMessage>
            <NoChickens navigation={navigation} />
          </HelpMessage>
        </View>
      )}
      <FlatList
        data={Object.keys(chickens || {})}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FlockItem item={item} navigation={navigation} chickens={chickens} />
        )}
      />
    </Content>
  </Container>
);

export default FlockRenderer;
