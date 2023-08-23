import React from 'react';
import { ProfileHeader } from 'react-native-story-view';
import { HeaderProps } from './types';
import { Text, View } from 'react-native';

const Header = ({ userStories, multiStoryRef, ...props }: HeaderProps) => (
  <View style={{backgroundColor: "green"}}>
    <ProfileHeader
    userImage={{ uri: userStories?.profile ?? '' }}
    userName={userStories?.username}
    userMessage={userStories?.title}
    onClosePress={() => {
      multiStoryRef?.current?.close?.();
    }}
    {...props}
  />
  </View>
);

export default Header;
