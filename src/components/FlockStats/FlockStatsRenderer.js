/* @flow */
import React from 'react';
import {
  Text, Container, Content, Separator,
} from 'native-base';
import Header from '../Header';
import { type FlockStats as FlockStatsType, type Chicken } from '../../types';
import Leaderboard from '../Leaderboard';
import Chart from '../Chart';
import Stats from '../Stats';

type Props = {
  stats: FlockStatsType,
  chickens: {
    [chickenId: string]: Chicken,
  },
};

const FlockStatsRenderer = ({ stats, chickens }: Props) => (
  <Container>
    <Header title="All Time Stats" eggButton />

    <Content>
      <Chart />
      <Stats stats={stats} mode="allTime" />
      <Leaderboard stats={stats} chickens={chickens} />
    </Content>
  </Container>
);

export default FlockStatsRenderer;
