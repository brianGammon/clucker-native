/* @flow */
import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const label = {
  fontSize: 17,
  fontWeight: 'bold',
};

export const chartSettings = {
  yAxis: {
    svg: {
      fontSize: 10,
      fill: 'black',
    },
    contentInset: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
  xAxis: {
    contentInset: {
      top: 10,
      bottom: 10,
      left: 35,
      right: 5,
    },
    svg: {
      fontSize: 10,
      fill: 'black',
      rotation: -90,
      origin: '18, 18',
    },
  },
  lineChart: {
    svg: {
      stroke: variables.cluckerOrange,
      strokeWidth: 3,
    },
    contentInset: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
};
const xAxisHeight = 35;
export default StyleSheet.create({
  lineChart: {
    flex: 1,
  },
  yAxis: {
    marginBottom: xAxisHeight,
  },
  xAxis: {
    marginHorizontal: -10,
    height: xAxisHeight,
  },
  chartTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...label,
  },
  chartContainer: {
    borderColor: 'grey',
    height: 220,
    padding: 5,
    flexDirection: 'row',
  },
  chartBody: {
    flex: 1,
    marginLeft: 10,
  },
  chartLoadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 220,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  spinner: {
    color: variables.cluckerOrange,
  },
});
