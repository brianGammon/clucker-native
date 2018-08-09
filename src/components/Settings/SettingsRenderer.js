import * as React from 'react';
import {
  Text, ScrollView, View, Button,
} from 'react-native';
import { type Flock } from '../../types';

type Props = {
  flocks: {
    [flockId: string]: Flock,
  },
};

const SettingsRenderer = ({ flocks }: Props) => (
  <ScrollView>
    <View>
      <Text>Account</Text>
      <Text>test@exmaple.com</Text>
      <Button title="Sign Out" onPress={() => {}} />
    </View>
    <View>
      <Text>Flocks</Text>
    </View>
    {Object.keys(flocks).map(key => (
      <View key={key} style={{ flexDirection: 'row' }}>
        <Text>{flocks[key].name}</Text>
        <Button title="Delete Flock" onPress={() => {}} />
      </View>
    ))}
  </ScrollView>
);
export default SettingsRenderer;
