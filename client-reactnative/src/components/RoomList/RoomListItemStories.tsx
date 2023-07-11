import Close from '../../assets/close'
//import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Pressable, View, Image, Text, Dimensions, StatusBar, ScrollView, Platform } from 'react-native';
import ExpoInstaStory from 'expo-insta-story';
const { width } = Dimensions.get('window');

export default function RoomListItemStory() {
  const data = [
    {
      id: 1,
      avatar_image:
        'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
      user_name: 'Muhammad Bilal',
      stories: [
        {
          story_id: 1,
          story:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
          duration: 10, //This tells the duration of each screen
        },
        {
          story_id: 2,
          story:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
          duration: 10,
        },
      ],
    },
    {
      id: 2,
      avatar_image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      user_name: 'Test User',
      stories: [
        {
          story_id: 1,
          story:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
          duration: 10,
        },
        {
          story_id: 2,
          story: 'https://demo-link/123-123-123.mp4',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
          duration: 10,
          /* This indicates that this item is a video,
             when passing a video urlm this field must be added
          */
          isVideo: true,
        },
      ],
    },
  ];
  return (
    <ExpoInstaStory data={data} duration={10} />
  );
}

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 3
  },
  newStory: {
    borderColor: '#25D366',
  },
  viewedStory: {
    borderColor: '#D3D3D3'
  },
  storyImage: {
    height: 64,
    width: 64,
    borderRadius: 50
  },
  profileNameHorizontal: {
    width: Dimensions?.get('window')?.width / 5,
    textAlign: 'center',
  },
  avatarAndIconsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS === "ios" ? -64 : 0,
    height: 60,
    width: Dimensions?.get('window')?.width,
  },
  avatarAndProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12
  },
  profileImage: {
    height: 36,
    width: 36,
    borderRadius: 25
  },
  profileName: {
    color: "#fff",
    marginLeft: 12
  },
  uploadedAt: {
    color: "#fff",
    marginLeft: 12
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12
  },
});

export type Data = {
  profileName: string;
  profileImage: string;
  id: string | number;
  stories: Story[];
  viewed: boolean;
}
export type Story = {
  media: string;
  mediaType: "image" | "video";
  duration?: number;
  header?: JSX.Element;
  seeMoreUrl?: string
}

