/* @flow */
import React from 'react';
import { Image } from 'react-native';
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
import Chart from '../Chart';
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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../assets/logo-1200x1200.png')}
      />
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          flex: 1,
          paddingLeft: 10,
          fontWeight: 'bold',
          backgroundColor: '#f89500',
        }}
      >
        <H2
          style={{
            fontWeight: 'bold',
          }}
        >
          Clucker
        </H2>
      </View>
    </View>
    <Content padder>
      <View>
        <Text style={[styles.eggStatsLabel]}>Egg Stats</Text>
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

      <Text style={[styles.eggStatsLabel]}>Production Trend</Text>
      <Chart />

      <Line />
      <Leaderboard stats={stats} chickens={chickens} mode="allTime" />
      <Line />
      {stats.heaviest && <HeaviestEgg heaviest={stats.heaviest} />}
    </Content>
  </Container>
);

export default FlockStatsRenderer;
