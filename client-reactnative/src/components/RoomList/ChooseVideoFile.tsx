import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

type VideoPath = {
  uri?: string;
  type?: string;
  fileName?: string;
};
const screenHeight = Dimensions.get('window').height;
const halfScreenHeight = screenHeight /1.3;
const ChooseVideo: React.FC = () => {
  const [videoPath, setVideoPath] = useState<VideoPath>({});
  const [isVideoModalVisible, setVideoModalVisible] = useState<boolean>(false);

  const captureVideo = () => {
    let options = {
      mediaType: 'video',
      durationLimit: 30,
      videoQuality: 'low',
    };
    launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets && response.assets[0].uri) {
        setVideoPath({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          fileName: response.assets[0].fileName,
        });
        setVideoModalVisible(true); 
      }      
    });
  };

  const chooseMedia = () => {
    let options = {
      mediaType: 'photo',  // Allow both photos and videos
    };
  
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets && response.assets[0].uri) {
        const selectedMedia = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          fileName: response.assets[0].fileName,
        };
        setVideoPath(selectedMedia);
        setVideoModalVisible(true);
      }
    });
  };
  

  const uploadVideoToAPI = async () => {
    if (!videoPath.uri) return;

    const formData = new FormData();
    formData.append('video', {
      uri: videoPath.uri,
      type: videoPath.type || 'video/mp4',
      name: videoPath.fileName || 'uploadedvideo.mp4',
    });

    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titleText}>Video Picker in React Native</Text>
      <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVideoModalVisible}
        onRequestClose={() => {
          setVideoModalVisible(false);
        }}>
        <View style={styles.modalView}>
        {videoPath.type === 'video' ? (
          <Video
            source={{ uri: videoPath.uri }}
            style={styles.videoStyle}
            controls={true}
            resizeMode='cover'
          />
        ) : (
          <Image
            source={{ uri: videoPath.uri }}
            style={styles.videoStyle}
          />
        )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVideoModalVisible(false)}>
            <Text style={styles.textStyle}>Close Video</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={captureVideo}>
          <Text style={styles.textStyle}>Capture Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={chooseMedia}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={uploadVideoToAPI}>
          <Text style={styles.textStyle}>Upload Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  videoStyle: {
    width: '90%',   // 90% of the screen width
    height: 350,    // Fixed height of 400 pixels
    margin: 5,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background
    width: '100%', 
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#FF0000',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },
});

export default ChooseVideo;
