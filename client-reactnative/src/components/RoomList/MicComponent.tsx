import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
import LottieView from 'lottie-react-native';
import NeonButton from './NeonButton';
import NeonBigButton from './NeonBigBUttons';
import { Avatars } from './AvatarData';
import AvatarList from './AvatarFlatListItem';
import SmallNeonButton from './SmallNeonButtons';
import Icon  from 'react-native-vector-icons/Feather';

const MicComponent = () => {
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [playTime, setPlayTime] = useState('00:00:00');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  audioRecorderPlayer.setSubscriptionDuration(0.09);

  const onStartRecord = async () => {
    setIsRecording(true);
    const path = 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log(`uri: ${uri}`);
  };

  const onStopRecord = async () => {
    setPlayTime('00:00:00');
    setIsRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log('results path', result);
  };

  const onStartPlay = async () => {
    setPlayTime('00:00:00');
    const path = 'hello.m4a';
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      const playbackDuration = e.duration; 
      const currentPlayTime = e.currentPosition;
      setProgress(currentPlayTime / playbackDuration);
    
      if (playbackDuration && playbackDuration <= currentPlayTime + 50) { // added a buffer of 50ms to ensure end is detected
        setIsPlaying(false);
        setIsPaused(false); // Optional: if you want it to be not considered paused anymore
        setPlayTime('00:00:00');
        setProgress(0);
        audioRecorderPlayer.stopPlayer(); // Stopping the player after completion
        audioRecorderPlayer.removePlayBackListener(); // Important to remove listener to avoid memory leaks
      }
    });
    
    console.log(msg);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
    setIsPaused(false);
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
        await onPausePlay();
    } else if (isPaused) {
        await onResumePlay();
    } else {
        await onStartPlay();
    }
  };

  useEffect(() => {
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.stopPlayer();
    };
  }, [audioRecorderPlayer]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
      <View style={{
        height: 100
      }}>
        <AvatarList data={Avatars} />
      </View>

      { (isRecording && playTime < recordTime) ? 
        <View>
          <LottieView
            source={require('./../../assets/progressbar.json')}
            autoPlay
            loop
            style={{ width: 270, height: 270 }}
          />
        </View>
        : (
        <LottieView
          source={require('./../../assets/smallrec.json')}
          progress={0.2}
          style={{ width: 270, height: 270 }}
        />
      )}

      <Text style={styles.voicetime}>R.T: {recordTime}</Text>
      <Text style={styles.voicetime}>P.T: {playTime}</Text>
      <View style={{
        display: "flex",
        flexDirection: "row",
        
      }}>
        <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="#fff" />
        </TouchableOpacity>
        <LottieView
          source={require('./../../assets/progressbar.json')}
          progress={progress}
          style={{ width: 360, height: 80 }}
        />
      </View>
      <View style={styles.pauseMedia}>
        <NeonBigButton 
          title={require('./../../assets/camera.png')}
          onPress={onStartRecord}
        />
        <View style={{
          display: "flex",
          justifyContent: "space-around",
        }}>
          <View>
            { isRecording ? (
                <NeonButton 
                    title={require('./../../assets/stop.png')}
                    onPress={onStopRecord}
                />
            ) : (
                <NeonButton 
                    title={require('./../../assets/record.png')}
                    onPress={onStartRecord}
                />
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 40
            }}>
            
          </View>
        </View>
        <NeonBigButton 
          title={require('./../../assets/gallery.png')}
          onPress={onStartRecord}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  voicetime: {
    fontWeight: "bold",
    color: "gray"
  },
  pauseMedia: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pauseplay: {
    position: "absolute",
    left: 27
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    width: '80%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 15,
  },
  progressFill: {
    backgroundColor: '#4169E1',
    height: 10,
    borderRadius: 5,
  },
});

export default MicComponent;
