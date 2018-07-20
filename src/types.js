/* @flow */
import { type NavigationScreenProp, type NavigationStateRoute } from 'react-navigation';

export type Chicken = {
  name: string,
  breed: string,
  hatched: string,
  photoPath: string,
  photoUrl: string,
  thumbnailPath: string,
  thumbnailUrl: string,
};

export type UserSettings = {
  name: string,
  currentFlockId: string,
  flocks: { [string]: boolean },
};

export type Navigation = NavigationScreenProp<NavigationStateRoute>;
