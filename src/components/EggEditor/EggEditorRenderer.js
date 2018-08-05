/* @flow */
import React from 'react';
import { Text, View, Button } from 'react-native';
import { type Navigation, type Chicken, type Egg } from '../../types';

type Props = {
  navigation: Navigation,
  egg: Egg,
  chickens: {
    [string]: Chicken,
  },
  chickenId: string,
  defaultDate: string,
};

const EggEditorRenderer = ({
  navigation,
  egg,
  chickens,
  defaultDate,
  chickenId,
}: Props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 18 }}>
      {JSON.stringify(
        {
          egg,
          defaultDate,
          chickenId,
          chicken: chickens[chickenId],
        },
        null,
        2,
      )}
    </Text>
    <Button onPress={() => navigation.goBack()} title="Dismiss" />
  </View>
);

export default EggEditorRenderer;
