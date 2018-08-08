/* @flow */
import {
  type NavigationScreenProp,
  type NavigationStateRoute,
} from 'react-navigation';

export type Flock = {
  name: string,
  ownedBy: string,
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
  chickenName: string,
  damaged: boolean,
  date: string,
  modified: string,
  notes: string,
  userId: string,
  weight: string | number,
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
};

export type UserSettings = {
  name: string,
  currentFlockId: string,
  flocks: { [string]: boolean },
};

export type Navigation = NavigationScreenProp<NavigationStateRoute>;
