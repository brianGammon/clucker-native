/* @flow */
import React from 'react';
import { View, Spinner } from 'native-base';

const ChartLoading = () => (
  <View
    style={{
      alignItems: 'center',
      flexDirection: 'row',
      height: 200,
    }}
  >
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Spinner color="rgb(249, 149, 0)" />
    </View>
  </View>
);

export default ChartLoading;
