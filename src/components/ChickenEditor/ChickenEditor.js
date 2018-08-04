import * as React from 'react';
import { connect } from 'react-redux';
import chickenSelector from '../../selectors/chickenSelector';
import ChickenEditorRenderer from './ChickenEditorRenderer';
import { firebaseUpdateRequested } from '../../redux/actions';
import { type Chicken } from '../../types';
import { metaTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  chicken: Chicken,
  chickenId: string,
};

type State = {
  name: string,
  breed: string,
  hatched: string,
};

class ChickenEditor extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('chickenId', null) ? 'Edit' : 'Add'} Chicken`,
  });

  constructor() {
    super();
    this.state = {};
    this.onFieldChanged = this.onFieldChanged.bind(this);
  }

  componentDidMount() {
    const { chicken, chickenId } = this.props;
    if (chickenId) {
      this.setState({
        name: chicken.name,
        breed: chicken.breed,
        hatched: chicken.hatched,
      });
    }
  }

  onFieldChanged(name, text) {
    this.setState({ [name]: text });
  }

  render() {
    return (
      <ChickenEditorRenderer
        {...this.state}
        onFieldChanged={this.onFieldChanged}
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

const mapDispatchToProps = dispatch => ({
  saveForm: data => dispatch(firebaseUpdateRequested(data, metaTypes.chickens)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChickenEditor);
