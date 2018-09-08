import React from 'react';
import {
  View, Text, Container, Content, H2,
} from 'native-base';
import Header from '../Header';
import {
  type FlockStats as FlockStatsType,
  type Chicken,
  type Flock,
} from '../../types';
import Leaderboard from '../Leaderboard';
import Line from '../Line';
import HeaviestEgg from '../HeaviestEgg';
import styles from './styles';

type Props = {
  flock: Flock,
  stats: FlockStatsType,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const FlockStatsRenderer = ({ stats, chickens, flock }: Props) => (
  <Container>
    <Header title="Flock Stats" subTitle={flock.name} eggButton />
    <Content padder>
      <View>
        <Text style={[styles.eggStatsLabel]}>Eggs</Text>
        <View style={styles.eggStats}>
          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>Eggs Laid</Text>
            <H2>{stats.total}</H2>
          </View>
          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>30 Day Avg</Text>
            <H2>{Math.round(10 * stats.averageNumber) / 10}</H2>
            <Text style={styles.subText}>Per Day</Text>
          </View>
          <View style={styles.eggStatsCell}>
            <Text style={styles.label}>Avg Weight</Text>
            <H2>{Math.round(10 * stats.averageWeight) / 10}</H2>
            <Text style={styles.subText}>Grams</Text>
          </View>
        </View>
      </View>

      <Line />
      <View style={{ alignItems: 'center' }}>
        <Text>Chart Here</Text>
      </View>

      <Line />
      <Leaderboard stats={stats} chickens={chickens} mode="allTime" />
      <Line />
      {stats.heaviest && <HeaviestEgg heaviest={stats.heaviest} />}
    </Content>
  </Container>
);

export default FlockStatsRenderer;
