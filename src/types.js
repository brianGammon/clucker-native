/* @flow */
import {
  type NavigationScreenProp,
  type NavigationStateRoute,
} from 'react-navigation';

export type User = {
  uid: string,
  email: string,
};

export type Chicken = {
  name: string,
  breed: string,
  hatched: string,
  photoPath: string,
  photoUrl: string,
  thumbnailPath: string,
  thumbnailUrl: string,
};

export type Egg = {
  chickenId: string,
  damaged: boolean,
  date: string,
  modified: string,
  notes: string,
  weight: string | number,
  quantity: number,
};

export type ChickenStats = {
  total: number,
  heaviest: Egg,
  longestStreak: number,
  lastSevenDays: {
    [string]: number,
  },
};

export type FlockStats = {
  total: number,
  heaviest?: Egg,
  averageWeight: number,
  averageNumber: number,
  firstEgg: string,
  mostEggs: string,
  eggsPerChicken: {
    [chickenId: string]: number,
  },
  eggsPerPeriod: {
    [period: string]: {
      total: number,
      byChicken: {
        [chickenId: string]: number,
      },
    },
  },
};

export type CalendarData = {
  [date: string]: {
    total: number,
    hasNote: boolean,
    byChicken: {
      [chickenId: string]: number,
    },
  },
};

export type ChartData = [
  {
    date: Date,
    count: number,
  },
];

export type Navigation = NavigationScreenProp<NavigationStateRoute>;
