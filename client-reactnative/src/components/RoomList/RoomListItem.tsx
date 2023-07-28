/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { RoomListItemIcon } from "./RoomListItemIcon";
import { Box, HStack, Text, View, VStack } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { observer } from "mobx-react-lite";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { commonColors, textStyles } from "../../../docs/config";
import { useStores } from "../../stores/context";
import { MultiStoryScreen } from '../storyView/modules';
import { format } from "date-fns";
import dayjs from "dayjs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HomeStackNavigationProp } from "../../navigation/types";
import { People } from './Participants';
import Feather from 'react-native-vector-icons/Feather';


interface RoomListProps {
  jid: string;
  name: string;
  counter: number;
  participants: string | number;
  index: number;
  length: number;
}



const removeStringSplits = (str: string) => {
  if (str) {
    return str.trim().split(/\s+/).join(" ");
  }
};
const getTime = (time: Date | undefined) => {
  if (!time) {
    return null;
  }
  try {
    const oneday = 60 * 60 * 24 * 1000;
    const now = Date.now();
    //@ts-ignore
    const isMoreThanADay = now - time > oneday;
    if (isMoreThanADay) {
      return dayjs(time).locale("en").format("MMM D");
    } else {
      return format(new Date(time), "hh:mm");
    }
  } catch (error) {
    return null;
  }
};
export const RoomListItem = observer(
  ({ jid, name, participants }: RoomListProps) => {
    
    const [randomColor, setRandomColor] = useState(getRandomColor());
    function getRandomColor() {
      var minShade = 0; // Minimum shade value (0-255) for black
      var maxShade = 0; // Maximum shade value (0-255) for black
      var shade = Math.floor(Math.random() * (maxShade - minShade + 1)) + minShade; // Random shade value
    
      var color = 'rgb(' + shade + ',' + shade + ',' + shade + ')';
      return color;
    }
    const { chatStore } = useStores();
    const room = chatStore.roomsInfoMap[jid];
    const navigation = useNavigation<HomeStackNavigationProp>();

    const defaultText = "Tap to view and join the conversation.";

    const navigateToChat = () => {
      console.log("navigate")
      chatStore.updateBadgeCounter(jid, "CLEAR");
      //@ts-ignore
      navigation.navigate("ChatScreen", { chatJid: jid, chatName: name });
    };
    return (
      <View>
        <Box
        style={{ height: 400}}
        borderRadius={30}
        backgroundColor={randomColor}
        padding="1.5"
        _dark={{
          borderColor: "gray.600",
        }}
       
        >
          <View style={{
            display: "flex",

          }}>
          </View>
          <TouchableOpacity onPress={navigateToChat} style={styles.NameIcon}>
                <RoomListItemIcon
                  name={name}
                  jid={jid}
                  counter={chatStore.roomsInfoMap[jid]?.counter}
                />
                  <Text
                  shadow={'2'}
                  width={hp('40%')}
                  height={hp('3%')}
                  textAlign={'left'}
                  paddingLeft={2}
                  fontWeight={600}
                  numberOfLines={1}
                  fontSize={18}
                  accessibilityLabel="Name"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="white"
                  justifyContent={"center"}
                  alignItems={"center"}
                  backgroundColor={randomColor}
                >                   
                {name}
              </Text>
            </TouchableOpacity>
            <View style={{
              paddingTop: 20,
              height: hp("30.54%")
            }}>
            {room?.lastUserText ? (
                  
                    <MultiStoryScreen />
                  
                ) : (
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontFamily={textStyles.regularFont}
                  >
                    {defaultText}
                  </Text>
                )}
            </View>
            <View style={{
                  paddingLeft: 30,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 7,
                }}>
              <People members={participants}/>
              <Text color={"white"} paddingLeft={5}>
                {getTime(room?.lastMessageTime)}
              </Text>
              
                  <View flex={1} justifyContent={"center"} alignItems={"flex-end"}>
                  <TouchableOpacity onPress={navigateToChat}>
                  <Image 
                  style={{
                    height: hp('7%'),
                    width: 115,
                  }}
                  source={require('../../assets/messageneon.png')} />
                  </TouchableOpacity>
                </View>
                <View flex={0.3}>
                  <TouchableOpacity onPress={navigateToChat}>
                  <Image 
                  style={{
                    height: hp('7%'),
                    width: 85,
                   
                  }}
                  source={require('../../assets/micneon.png')} />
                    </TouchableOpacity>
                </View>

            </View>
        </Box>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  NameIcon: {
    height: 30,
    paddingLeft: -20,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 20,

  },
  lastAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  lastAvatarContainer: {
    paddingBottom: 30
  }
});
