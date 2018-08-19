/* @flow */
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Dimensions, Modal, View, TouchableOpacity, Image,
} from 'react-native';
import styles from './styles';

type Props = {
  url: string,
  showModal: boolean,
  toggleModal: (visible: boolean) => void,
};

const ImageViewer = ({ url, showModal, toggleModal }: Props) => {
  let { height, width } = Dimensions.get('window');
  return (
    <Modal
      animationType="fade"
      transparent
      visible={showModal}
      supportedOrientations={['portrait', 'landscape']}
      onOrientationChange={() => {
        height = Dimensions.get('window').height;
        width = Dimensions.get('window').width;
      }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            toggleModal(!showModal);
          }}
        >
          <Ionicons name="ios-close" color="white" style={styles.closeIcon} />
        </TouchableOpacity>
        <Image
          resizeMode="cover"
          style={{
            width: width < height ? width : height,
            height: width < height ? width : height,
          }}
          source={
            url
              ? { uri: url }
              : require('../../assets/default-profile-photo.png')
          }
        />
      </View>
    </Modal>
  );
};

export default ImageViewer;
