import * as React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import ChickenRenderer from './ChickenRenderer';
import chickenSelector from '../../selectors/chickenSelector';
import { Chicken as ChickenType, Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  chicken: ChickenType,
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
        prevChickenId={prevChickenId}
        nextChickenId={nextChickenId}
      />
    );
  }
}

const mapStateToProps = ({ chickens }, { navigation }) => ({
  ...chickenSelector(chickens.items, navigation.getParam('chickenId', 'NO-ID')),
});

export default connect(mapStateToProps)(Chicken);
