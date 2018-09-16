/* @flow */
import React from 'react';
import {
  View, Text, Container, Content, H2,
} from 'native-base';
import Header from '../Header';
import {
  type FlockStats as FlockStatsType,
  type Chicken,
} from '../../types';
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

    <Content padder>
      <View>
        <View style={styles.eggStats}>
          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>Eggs Laid</Text>
            <H2 style={styles.eggStatsValue}>{stats.total}</H2>
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
              {Math.round(10 * stats.averageWeight) / 10}
            </H2>
            <Text style={styles.subText}>Grams</Text>
          </View>
        </View>
      </View>

      <Line />

      <Chart />

      <Line />
      <Leaderboard stats={stats} chickens={chickens} mode="allTime" />
      <Line />
      {stats.heaviest && <HeaviestEgg heaviest={stats.heaviest} />}
    </Content>
  </Container>
);

export default FlockStatsRenderer;
