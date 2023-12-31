import React, { useRef, useState, useEffect } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import {
  type MultiStoryRef,
  Indicator,
  MultiStory,
  TransitionMode
} from 'react-native-story-view';
import { stories, Strings } from '../../constants';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Header, Footer } from '../../components';
import { Colors } from '../../theme';
import styles from './styles';

const MultiStoryScreen = () => {
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
                
                borderWidth: 0
              },
              userNameStyle: { fontSize: 16, position: "absolute", padding: 5, bottom: 50 },
              userImageStyle: { borderRadius: 10, height: hp("40.54%"), width: hp("22.64%")},
              containerStyle: {borderRadius: 10, height: hp("40.54%"), width: hp("22.64%"), borderWidth: 0, borderColor: "gray", backgroundColor: "gray", marginHorizontal: -5}
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
                barActiveColor: "yellow",
                barHeight: 6
              }
            }}
          />
      </View>
  );
};

export default MultiStoryScreen;
