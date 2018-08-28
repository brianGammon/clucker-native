import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import FormInput from '../FormInput';
import styles from './styles';

type Props = {
  form: any,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  handleSubmit: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
  error: string,
  originalPhotoUrl: string,
  // newImage: any,
};

const ChickenEditorRenderer = ({
  form,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  handleSubmit,
  error,
  originalPhotoUrl,
  onSelectPhoto,
}: // newImage,
Props) => (
  <ScrollView>
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.editorContainer}>
        {error && <Text style={styles.error}>{error}</Text>}
        <FieldGroup
          control={form}
          render={({ invalid }) => (
            <View style={styles.formContainer}>
              <FieldControl
                name="name"
                render={FormInput}
                meta={{ label: 'Name', maxLength: 25 }}
              />

              <FieldControl
                name="breed"
                render={FormInput}
                meta={{
                  label: 'Breed',
                  maxLength: 25,
                }}
              />

              <FieldControl
                name="hatched"
                render={FormInput}
                meta={{
                  label: 'Hatched On',
                }}
              />

              <Field
                control={form.get('photoUrl')}
                render={({ value: photoUrl }) => {
                  const { newImage } = form.value;
                  let imageSource = require('../../assets/default-profile-photo.png');
                  if (photoUrl !== '') {
                    imageSource = { uri: photoUrl };
                  }
                  if (newImage) {
                    imageSource = {
                      uri: `data:${newImage.mime};base64,${newImage.data}`,
                    };
                  }
                  return (
                    <View>
                      <Text style={styles.label}>Profile Photo:</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          style={{ width: 200, height: 200 }}
                          source={imageSource}
                        />
                        <View>
                          {photoUrl !== ''
                            && !newImage && (
                              <Button
                                onPress={onRemoveProfilePhoto}
                                title="Remove"
                              />
                          )}
                          {((originalPhotoUrl !== '' && photoUrl === '')
                            || newImage) && (
                            <Button
                              onPress={onResetProfilePhoto}
                              title="Reset"
                            />
                          )}
                          <Button
                            onPress={() => onSelectPhoto(false)}
                            title="Select Photo"
                          />
                          <Button
                            onPress={() => onSelectPhoto(true)}
                            title="Take Photo"
                          />
                        </View>
                      </View>
                    </View>
                  );
                }}
                meta={{
                  label: 'Photo URL',
                }}
              />
              <Button disabled={invalid} onPress={handleSubmit} title="Save" />
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  </ScrollView>
);

export default ChickenEditorRenderer;
