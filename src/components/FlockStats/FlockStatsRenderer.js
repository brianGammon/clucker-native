import React from 'react';
import { Text, ScrollView } from 'react-native';
import { type FlockStats as FlockStatsType } from '../../types';

type Props = {
  stats: FlockStatsType,
};

const FlockStatsRenderer = ({ stats }: Props) => {
  console.log('temp');
  return (
    <ScrollView>
      <Text>{JSON.stringify(stats, null, 2)}</Text>
    </ScrollView>
  );
};

export default FlockStatsRenderer;
