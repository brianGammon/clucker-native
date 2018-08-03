import * as React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import ChickenRenderer from './ChickenRenderer';

type Props = {
  navigation: any,
  chickens: any,
};

class Chicken extends React.Component<Props> {
  render() {
    const { navigation, chickens } = this.props;
    const currentChickenId = navigation.getParam('chickenId', 'NO-ID');
    const chickenIds = Object.keys(chickens || {});
    const currentChickenIndex = chickenIds.indexOf(currentChickenId);
    const nextChickenId = currentChickenIndex === chickenIds.length - 1
      ? null
      : chickenIds[currentChickenIndex + 1];
    const prevChickenId = currentChickenIndex === 0 ? null : chickenIds[currentChickenIndex - 1];
    const chicken = chickens[currentChickenId];

    if (currentChickenId === 'NO-ID') {
      return <Text>No Chicken ID passed in!</Text>;
    }

    if (!chicken) {
      return <Text>{`Chicken with ID ${currentChickenId} not found`}</Text>;
    }

    return (
      <ChickenRenderer
        navigation={navigation}
        chicken={chicken}
        prevChickenId={prevChickenId}
        nextChickenId={nextChickenId}
      />
    );
  }
}

const mapStateToProps = ({ chickens }) => ({ chickens: chickens.items });

export default connect(mapStateToProps)(Chicken);
