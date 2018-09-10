/* @flow */
import React from 'react';
import moment from 'moment';
import {
  XAxis, YAxis, Grid, LineChart,
} from 'react-native-svg-charts';
import {
  View, Icon, Button, Text,
} from 'native-base';
import { type ChartData } from '../../types';
import LineDecorator from './LineDecorator';
import styles from './styles';

type Props = {
  data: ChartData,
  onRefreshChart: () => void,
};

const ChartRenderer = ({ data, onRefreshChart }: Props) => (
  <View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={styles.label}>Production Trend</Text>
      <Button transparent onPress={onRefreshChart}>
        <Icon active name="refresh" />
      </Button>
    </View>
    <View
      style={{
        borderColor: 'grey',
        height: 220,
        padding: 5,
        flexDirection: 'row',
      }}
    >
      <YAxis
        yAccessor={({ item }) => item.count}
        data={data}
        style={{ marginBottom: 35 }}
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
          {/* $FlowFixMe: react-native-svg passes props into decorators */}
          <LineDecorator />
        </LineChart>
        <XAxis
          style={{
            marginHorizontal: -10,
            height: 35,
          }}
          xAccessor={({ item }) => item.date}
          data={data}
          formatLabel={(value, index) => {
            // if there's more than 24 elements, skip every other label
            if (data.length > 24) {
              if ((index / 2) % 1 !== 0) {
                return '';
              }
            }
            return moment(value).format('MMM-YY');
          }}
          contentInset={{
            top: 10,
            bottom: 10,
            left: 35,
            right: 10,
          }}
          svg={{
            fontSize: 10,
            fill: 'black',
            rotation: -90,
            origin: '18, 18',
          }}
        />
      </View>
    </View>
  </View>
);

export default ChartRenderer;
