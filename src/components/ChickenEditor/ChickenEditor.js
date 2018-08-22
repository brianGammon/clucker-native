/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import chickenSelector from '../../selectors/chickenSelector';
import ChickenEditorRenderer from './ChickenEditorRenderer';
import { type Chicken } from '../../types';
import { actionTypes, metaTypes } from '../../redux/constants';

type Props = {
  navigation: any,
  userId: string,
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
  newImage: any,
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
    newImage: null,
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
      newImage: null,
    });
  };

  onSelectPhoto = (withCamera: boolean) => {
    const options = {
      width: 480,
      height: 480,
      cropping: true,
      includeBase64: true,
    };
    let picker = ImagePicker.openPicker;
    if (withCamera) {
      picker = ImagePicker.openCamera;
    }
    picker(options)
      .then((image) => {
        this.setState({ newImage: image });
      })
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log(error);
        }
      });
  };

  onSaveForm = () => {
    const {
      chicken, chickenId, flockId, saveForm, userId,
    } = this.props;
    const { newImage, ...rest } = this.state;
    const data = { ...chicken, ...rest };
    const payload = {
      flockId,
      chickenId,
      data,
      userId,
      newImage,
    };
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
        onSelectPhoto={this.onSelectPhoto}
      />
    );
  }
}

const mapStateToProps = (
  { chickens, userSettings, auth: { user } },
  { navigation },
) => {
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
    userId: user.uid,
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
