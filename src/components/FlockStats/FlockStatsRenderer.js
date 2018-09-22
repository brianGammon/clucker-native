/* @flow */
import React from 'react';
import {
  View, Text, Container, Content, H2, Separator, ListItem, Left, Body, Right, Thumbnail, List
} from 'native-base';
import Header from '../Header';
import { type FlockStats as FlockStatsType, type Chicken } from '../../types';
import Leaderboard from '../Leaderboard';
import Line from '../Line';
import Chart from '../Chart';
import HeaviestEgg from '../HeaviestEgg';
import styles from './styles';

type Props = {
  stats: FlockStatsType,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const FlockStatsRenderer = ({ stats, chickens }: Props) => (
  <Container>
    <Header title="Flock Stats" eggButton />

    <Content>
      {/* <View>
        <View style={styles.eggStats}>
          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>Eggs Logged</Text>
            <H2 style={styles.eggStatsValue}>{stats.total}</H2>
            <Text style={styles.subText}>Total</Text>
          </View>
          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>30 Day Avg</Text>
            <H2 style={styles.eggStatsValue}>
              {Math.round(10 * stats.averageNumber) / 10}
            </H2>
            <Text style={styles.subText}>Per Day</Text>
          </View>

          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>Avg Weight</Text>
            <H2 style={styles.eggStatsValue}>
              {stats.averageWeight > 0
                ? Math.round(10 * stats.averageWeight) / 10
                : '--'}
            </H2>
            <Text style={styles.subText}>Grams</Text>
          </View>
        </View>
      </View> */}

      <Separator>
        <Text>TRENDLINE</Text>
      </Separator>
      <Chart />
      <Separator>
        <Text>FLOCK STATS</Text>
      </Separator>
      <ListItem>
        <View style={styles.flex}>
          <Text>Total Eggs Laid</Text>
        </View>
        <View>
          <Text>567</Text>
        </View>
      </ListItem>
      <ListItem>
        <View style={styles.flex}>
          <Text>Average Per Day (30 day)</Text>
        </View>
        <View>
          <Text>2.2</Text>
        </View>
      </ListItem>
      <ListItem>
        <View style={styles.flex}>
          <Text>Average Weight</Text>
        </View>
        <View>
          <Text>
            66.7
          </Text>
        </View>
      </ListItem>
      <ListItem>
        <View style={styles.flex}>
          <Text>Heaviest Egg</Text>
        </View>
        <View>
          <Text>
            88.1 grams
          </Text>
        </View>
      </ListItem>
      <Separator>
        <Text>LEADERBOARD</Text>
      </Separator>
      {Object.keys(stats.eggsPerChicken).map((key) => {
        if (!chickens[key]) {
          return null;
        }
        return (
          <ListItem key={key} style={{ paddingTop: 4, paddingBottom: 4}}>
            <Left style={{ flex: 1 }}>
              <Thumbnail
                small
                square
                source={
                  chickens[key].thumbnailUrl
                    ? { uri: chickens[key].thumbnailUrl }
                    : require('../../assets/default-profile-photo_thumb.png')
                }
              />
              <Text style={styles.leaderText}>
                {chickens[key] ? chickens[key].name : 'Unnamed Hen'}
                
              </Text>
            </Left>
            
            <Right>
              <Text style={styles.value}>{stats.eggsPerChicken[key]}</Text>
            </Right>
            
          </ListItem>
        );
      })}
    </Content>
  </Container>
);

export default FlockStatsRenderer;
