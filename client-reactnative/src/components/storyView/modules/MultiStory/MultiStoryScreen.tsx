import React, { useRef, useState, useEffect } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import {
  type MultiStoryRef,
  Indicator,
  MultiStory,
  TransitionMode
} from 'react-native-story-view';
import { stories, Strings } from '../../constants';
import { Header, Footer } from '../../components';
import { Colors } from '../../theme';
import styles from './styles';

const MultiStoryScreen = () => {
  const multiStoryRef = useRef<MultiStoryRef>(null);
  const [userStories, setUserStories] = useState(
    JSON.parse(JSON.stringify(stories))
  );
  useEffect(() => {
    const initialStories = JSON.parse(JSON.stringify(stories));
    const sortedStories = initialStories.sort((a, b) => b.allIsViewed - a.allIsViewed);
    setUserStories(sortedStories);
  }, []);

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
            userNameStyle: { fontSize: 16, },
            userImageStyle: { borderRadius: 20, height: 245, width: 181},
            containerStyle: {borderRadius: 17, height: 240, width: 180, borderWidth: 0, borderColor: "gray", marginHorizontal: -8}
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

export default MultiStoryScreen;
