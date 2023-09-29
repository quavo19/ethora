import React, { useRef, useState, useEffect } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import {
  type MultiStoryRef,
  Indicator,
  MultiStory,
  TransitionMode
} from 'react-native-story-view';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { stories, Strings } from '../../constants';
import { Header, Footer } from '../../components';
import { Colors } from '../../theme';
import styles from './styles';

const ChatMultiStoryScreen = () => {
  const multiStoryRef = useRef<MultiStoryRef>(null);
  const [userStories, setUserStories] = useState(
    JSON.parse(JSON.stringify(stories))
  );

  const onStoryClose = (viewedStories?: Array<boolean[]>) => {
    if (viewedStories == null || viewedStories == undefined) return;
    const stories = [...userStories];
    userStories.map((_: any, index: number) => {
      userStories[index].stories.map((_: any, subIndex: number) => {
        stories[index].stories[subIndex].isSeen =
          viewedStories[index][subIndex];
      });
    });
    setUserStories([...stories]);
  };

  return (
      <View>
      
    <MultiStory
          stories={userStories}
          transitionMode={TransitionMode.Cube}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ref={multiStoryRef}       
          onComplete={onStoryClose}
          avatarProps={{
            viewedStoryContainerStyle: {
              borderRadius: 0
            },
            userNameStyle: { fontSize: 16 },
            userImageStyle: { borderRadius: 10},
            containerStyle: {borderRadius: 10, height: "80%", width:  90, borderWidth: 0, marginHorizontal: -10}            
          }}
          storyContainerProps={{
            renderHeaderComponent: ({ userStories }) => (
              <Header {...{ userStories, multiStoryRef }} />
            ),
            renderFooterComponent: ({ userStories, story, progressIndex }) => (
              <Footer {...{ userStories, story, progressIndex }}/>
            ),
            renderIndicatorComponent: () => <Indicator />,
            barStyle: {
              barActiveColor: Colors.red
            }
          }}
     />
      </View>
  );
};

export default ChatMultiStoryScreen;
