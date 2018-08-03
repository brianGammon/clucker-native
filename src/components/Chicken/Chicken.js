import * as React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import ChickenRenderer from './ChickenRenderer';
import chickenSelector from '../../selectors/chickenSelector';
import chickenStatsSelector from '../../selectors/chickenStatsSelector';
import { Chicken as ChickenType, Navigation, ChickenStats } from '../../types';

type Props = {
  navigation: Navigation,
  chicken: ChickenType,
  stats: ChickenStats,
  chickenId: string,
  prevChickenId: string,
  nextChickenId: string,
};

class Chicken extends React.Component<Props> {
  render() {
    const {
      chicken,
      chickenId,
      prevChickenId,
      nextChickenId,
      stats,
      navigation,
    } = this.props;

    if (chickenId === 'NO-ID') {
      return <Text>No Chicken ID passed in!</Text>;
    }

    if (!chicken) {
      return <Text>{`Chicken with ID ${chickenId} not found`}</Text>;
    }

    return (
      <ChickenRenderer
        navigation={navigation}
        chicken={chicken}
        stats={stats}
        prevChickenId={prevChickenId}
        nextChickenId={nextChickenId}
      />
    );
  }
}

const mapStateToProps = ({ chickens, eggs }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', 'NO-ID');
  return {
    ...chickenSelector(chickens.items, chickenId),
    stats: chickenStatsSelector(eggs.items, chickenId),
  };
};

export default connect(mapStateToProps)(Chicken);
