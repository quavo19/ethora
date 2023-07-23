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
    
    
  ]);
  //setting this state to null will close the story view
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);

  useEffect(() => {
    //we are adding header to each story item
    const _tempData = [...data];
    _tempData.forEach((story) => {
      story.stories.forEach((storyItem) => {
        storyItem.header = <View style={[styles.avatarAndIconsContainer]}>
          {/* THE AVATAR AND USERNAME  */}
          <View style={[styles.avatarAndIconsContainer]}>
            {/* <LinearGradient
              colors={[`rgba(0,0,0,0.25)`, 'transparent']}
              style={[styles.linearGradient]}
            /> */}
            <View style={styles.avatarAndProfileContainer}>
              <Image
                style={[styles.profileImage]}
                source={{
                  uri: story?.profileImage
                }} />
              <View>
                <Text
                  numberOfLines={1}
                  style={[{ width: width / 1.75 }, styles.profileName]}>
                  {story?.profileName}
                </Text>
              </View>
            </View>
            {/* END OF THE AVATAR AND USERNAME */}
          </View>
          <View style={styles.iconContainer}>
            {/* THE CLOSE BUTTON */}
            <Pressable style={{ marginLeft: 12 }} onPress={() => setCurrentStoryIndex(1)}>
              <Close height={28} width={28} fill={"#fff"} stroke={"#fff"} />
            </Pressable>
            {/* END OF CLOSE BUTTON */}
          </View>
        </View>
      });
    });
    setData(_tempData);
  }, []);

  const handleNext = () => {
    console.log("went to next")
  };

  const handlePrevious = () => {
    console.log("went to prev")
  };
  const handleAllStoriesEnd = () => {
    if (currentStoryIndex === null) {
      setCurrentStoryIndex(0); // Start showing the first story
    } else if (currentStoryIndex < data.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1); // Move to the next story
    } else {
      setCurrentStoryIndex(null); // Close the story view when all stories are finished
    }
  };
  return (
    <SafeAreaView 
     style={{
      position: "absolute",
      zIndex: 20,
      top: 70,
     }}
    >
      <StatusBar />
      {/* you can also use FlatList here */}
      <ScrollView horizontal>
        {data.map((story, index) => (
          <Pressable
            key={"story-" + story.id}
            onPress={() => setCurrentStoryIndex(index)}
            style={[styles.storyContainer]}>
            <View
              style={[styles.imageContainer,
              story.viewed ? styles.viewedStory : styles.newStory]}>
              <Image
                style={[styles.storyImage]}
                resizeMode={"cover"}
                source={{ uri: story?.profileImage }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={[styles.profileNameHorizontal]}>
              {story?.profileName}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {currentStoryIndex !== null &&
        <Stories
          stories={data[currentStoryIndex].stories}
          //called when user taps on next
          onNext={() => handlePrevious()}
          //called when user taps on previous
          onPrevious={() => handleNext()}
          // close story view if there are no more stories to go next to
          onAllStoriesEnd={handleAllStoriesEnd}
          //close story view if there are no more stories to go back to
          onPreviousFirstStory={() => setCurrentStoryIndex(null)}
          //custom loading component
          loadingComponent={<Text style={{
            position: 'absolute',
            color: '#fff',
            bottom: Dimensions.get("window").height / 2,
            left: Dimensions.get("window").width / 2, transform: [{ translateX: -50 }]
        }}>Custom Loading...</Text>}
        />}
    </SafeAreaView>
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

