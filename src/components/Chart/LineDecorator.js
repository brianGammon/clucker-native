import React from 'react';
import { Circle } from 'react-native-svg';
import { type ChartData } from '../../types';

type DecoratorProps = {
  x: any,
  y: any,
  data: ChartData,
};
const LineDecorator = ({ x, y, data }: DecoratorProps) => data.map((value, index) => (
  <Circle
    key={value.date}
    cx={x(index)}
    cy={y(value.count)}
    r={4}
    stroke="rgb(249, 149, 0)"
    fill="white"
  />
));

export default LineDecorator;
