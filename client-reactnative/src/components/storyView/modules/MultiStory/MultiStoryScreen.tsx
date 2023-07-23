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
import Images from '../../assets';
import styles from './styles';

const MultiStoryScreen = (visible, userStoryIndex) => {
  const multiStoryRef = useRef<MultiStoryRef>(null);
  const [pressedIndex, setPressedIndex] = useState(0);
  const [isStoryViewVisible, setIsStoryViewVisible] = useState(true);

  const [userStories, setUserStories] = useState(
    JSON.parse(JSON.stringify(stories))
  );

  useEffect(() => {
    setPressedIndex(userStoryIndex);
    setIsStoryViewVisible(visible);
  }, [visible, userStoryIndex]);

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
          /* callback after multi story is closed
            `viewedStories` contains multi dimension array of booleans whether story is seen or not
          */
          onComplete={onStoryClose}
          avatarProps={{
            viewedStoryContainerStyle: {
              borderColor: Colors.lightGrey
            }
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