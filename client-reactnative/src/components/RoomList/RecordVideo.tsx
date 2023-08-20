import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';

const VideoRecorder = () => {
  const options: CameraOptions = {
    mediaType: 'video',
    videoQuality: 'high',
  };

  const handleRecordVideo = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video recording');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const source = { uri: response.uri };

        // Here you can handle the recorded video URI
        console.log(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Record Video" onPress={handleRecordVideo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoRecorder;
