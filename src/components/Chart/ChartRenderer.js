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
import styles, { chartSettings } from './styles';

type Props = {
  data: ChartData,
  onRefreshChart: () => void,
};

const ChartRenderer = ({ data, onRefreshChart }: Props) => (
  <View>
    <View style={styles.chartTitle}>
      <Text style={styles.label}>Egg Trendline</Text>
      <Button dark transparent onPress={onRefreshChart}>
        <Icon active name="refresh" />
      </Button>
    </View>
    <View style={styles.chartContainer}>
      <YAxis
        yAccessor={({ item }) => item.count}
        data={data}
        style={styles.yAxis}
        contentInset={chartSettings.yAxis.contentInset}
        svg={chartSettings.yAxis.svg}
        formatLabel={(value) => {
          if (value % 1 !== 0) {
            return '';
          }
          return value;
        }}
      />
      <View style={styles.chartBody}>
        <LineChart
          style={styles.lineChart}
          yAccessor={({ item }) => item.count}
          data={data}
          svg={chartSettings.lineChart.svg}
          contentInset={chartSettings.lineChart.contentInset}
        >
          <Grid />
          {/* $FlowFixMe: react-native-svg passes props into decorators */}
          <LineDecorator />
        </LineChart>
        <XAxis
          style={styles.xAxis}
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
          contentInset={chartSettings.xAxis.contentInset}
          svg={chartSettings.xAxis.svg}
        />
      </View>
    </View>
  </View>
);

export default ChartRenderer;
