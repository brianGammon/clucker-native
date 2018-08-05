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
  flockId: string,
  saveForm: (payload: {}) => void,
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
    this.onSaveForm = this.onSaveForm.bind(this);
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

  componentDidUpdate(prevProps) {
    const { chicken, navigation } = this.props;
    if (prevProps.chicken !== chicken) {
      navigation.goBack();
    }
  }

  onFieldChanged(name, text) {
    this.setState({ [name]: text });
  }

  onSaveForm() {
    const {
      chicken, chickenId, flockId, saveForm,
    } = this.props;
    const updatedChicken = { ...chicken, ...this.state };
    const payload = { flockId, chickenId, updatedChicken };
    saveForm(payload);
  }

  render() {
    return (
      <ChickenEditorRenderer
        {...this.state}
        onFieldChanged={this.onFieldChanged}
        onSaveForm={this.onSaveForm}
      />
    );
  }
}

const mapStateToProps = ({ chickens, userSettings }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', null);
  if (!chickenId) {
    return {};
  }
  return {
    ...chickenSelector(chickens.data, chickenId),
    flockId: userSettings.data.currentFlockId,
  };
};

const mapDispatchToProps = dispatch => ({
  saveForm: payload => dispatch(firebaseUpdateRequested(payload, metaTypes.chickens)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChickenEditor);
