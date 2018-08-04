import * as React from 'react';
import { connect } from 'react-redux';
import chickenSelector from '../../selectors/chickenSelector';
import ChickenEditorRenderer from './ChickenEditorRenderer';
import { type Chicken } from '../../types';

type Props = {
  navigation: any,
  chicken: Chicken,
  chickenId: string,
};

class ChickenEditor extends React.Component<Props> {
  render() {
    const { navigation, chicken, chickenId } = this.props;
    return (
      <ChickenEditorRenderer
        navigation={navigation}
        chicken={chicken}
        chickenId={chickenId}
      />
    );
  }
}

const mapStateToProps = ({ chickens }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', 'NO-ID');
  if (chickenId === 'NO-ID') {
    return {};
  }
  return {
    ...chickenSelector(chickens.data, chickenId),
  };
};

export default connect(mapStateToProps)(ChickenEditor);
