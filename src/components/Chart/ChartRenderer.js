/* @flow */
import React from 'react';
import moment from 'moment';
import {
  XAxis, YAxis, Grid, LineChart,
} from 'react-native-svg-charts';
import { View } from 'native-base';

type Props = {
  data: [
    {
      date: Date,
      count: number,
    },
  ],
};

const ChartRenderer = ({ data }: Props) => (
  <View
    style={{
      // borderWidth: 1,
      // borderRadius: 20,
      borderColor: 'grey',
      height: 220,
      padding: 5,
      flexDirection: 'row',
    }}
  >
    <YAxis
      yAccessor={({ item }) => item.count}
      data={data}
      style={{ marginBottom: 30 }}
      contentInset={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
      svg={{ fontSize: 10, fill: 'black' }}
      formatLabel={(value) => {
        if (value % 1 !== 0) {
          return '';
        }
        return value;
      }}
    />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <LineChart
        style={{ flex: 1 }}
        yAccessor={({ item }) => item.count}
        data={data}
        svg={{ stroke: 'rgb(249, 149, 0)', strokeWidth: 3 }}
        contentInset={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        }}
      >
        <Grid />
      </LineChart>
      <XAxis
        style={{ marginHorizontal: -10, height: 30 }}
        xAccessor={({ item }) => item.date}
        data={data}
        formatLabel={(value, index) => {
          // if there's more than 12 elements, skip every other label
          if (data.length > 12) {
            if ((index / 2) % 1 !== 0) {
              return '';
            }
          }
          return moment(value).format('M/YY');
        }}
        contentInset={{
          top: 10,
          bottom: 10,
          left: 20,
          right: 20,
        }}
        svg={{ fontSize: 10, fill: 'black' }}
      />
    </View>
  </View>
);

export default ChartRenderer;
