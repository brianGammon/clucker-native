/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import chickenSelector from '../../selectors/chickenSelector';
import ChickenEditorRenderer from './ChickenEditorRenderer';
import { type Chicken } from '../../types';
import { actionTypes, metaTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  chicken: Chicken,
  chickenId: string,
  flockId: string,
  inProgress: boolean,
  error: string,
  saveForm: (payload: {}) => void,
  clearError: () => void,
};

type State = {
  name: string,
  breed: string,
  hatched: string,
  photoUrl: string,
  photoPath: string,
  thumbnailUrl: string,
  thumbnailPath: string,
};

class ChickenEditor extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('chickenId', null) ? 'Edit' : 'Add'} Chicken`,
  });

  state = {
    name: '',
    breed: '',
    hatched: '',
    photoUrl: '',
    photoPath: '',
    thumbnailUrl: '',
    thumbnailPath: '',
  };

  componentDidMount() {
    const { chicken, chickenId } = this.props;
    if (chickenId) {
      this.setState({
        ...chicken,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevInProgress = prevProps.inProgress;
    const { inProgress, error, navigation } = this.props;
    if (!inProgress && prevInProgress && !error) {
      navigation.goBack();
    }
  }

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  onFieldChanged = (name, text) => {
    this.setState({ [name]: text });
  };

  onRemoveProfilePhoto = () => {
    this.setState({
      photoPath: '',
      photoUrl: '',
      thumbnailPath: '',
      thumbnailUrl: '',
    });
  };

  onResetProfilePhoto = () => {
    const {
      chicken: {
        photoPath, photoUrl, thumbnailPath, thumbnailUrl,
      },
    } = this.props;
    this.setState({
      photoPath,
      photoUrl,
      thumbnailPath,
      thumbnailUrl,
    });
  };

  onSaveForm = () => {
    const {
      chicken, chickenId, flockId, saveForm,
    } = this.props;
    const data = { ...chicken, ...this.state };
    const payload = { flockId, chickenId, data };
    saveForm(payload);
  };

  render() {
    const {
      error,
      chicken: { photoUrl },
    } = this.props;
    return (
      <ChickenEditorRenderer
        {...this.state}
        onFieldChanged={this.onFieldChanged}
        onRemoveProfilePhoto={this.onRemoveProfilePhoto}
        onResetProfilePhoto={this.onResetProfilePhoto}
        onSaveForm={this.onSaveForm}
        error={error}
        originalPhotoUrl={photoUrl}
      />
    );
  }
}

const mapStateToProps = ({ chickens, userSettings }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', null);
  let chickenData = { chicken: {} };
  if (chickenId) {
    chickenData = chickenSelector(chickens.data, chickenId);
  }
  return {
    ...chickenData,
    flockId: userSettings.data.currentFlockId,
    inProgress: chickens.inProgress,
    error: chickens.error,
  };
};

const mapDispatchToProps = dispatch => ({
  saveForm: payload => dispatch({ type: actionTypes.SAVE_CHICKEN_REQUESTED, payload }),
  clearError: () => dispatch({
    type: actionTypes.CLEAR_ERROR,
    meta: { type: metaTypes.chickens },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChickenEditor);
