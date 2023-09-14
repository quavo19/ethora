/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import {observer} from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {useStores} from '../../stores/context';
import {RoomListItem} from './RoomListItem';
import {View, Text} from 'native-base';
import { RoomListIcon } from './RoomListIcon';
import MicComponent from './MicComponent';
import {FlatList} from 'react-native';
import {CreateNewChatButton} from '../Chat/CreateNewChatButton';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {HomeStackNavigationProp} from '../../navigation/types';
import { roomListProps, roomMemberInfoProps } from '../../stores/chatStore';
import LinearGradient  from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import CustomBackground from './CustomBackground';
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { 
  responsiveHeight, 
  responsiveWidth, 
  responsiveFontSize 
} from 'react-native-responsive-dimensions';


interface IRoomList{
  roomsList: roomListProps[];
  roomMemberInfo: roomMemberInfoProps[];
}

export const RoomList:React.FC<IRoomList> = observer((props:IRoomList) => {
  const {chatStore} = useStores();
  const {roomsList, roomMemberInfo} = props;
  const sortedRoomsList = roomsList.sort(
    (a: any, b: any) =>
      chatStore.roomsInfoMap[a.jid]?.priority -
      chatStore.roomsInfoMap[b.jid]?.priority,
  );
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedRoomJid, setSelectedRoomJid] = useState<string | null>(null);
  const selectedRoom = roomsList.find(room => room.jid === selectedRoomJid);
  const selectedRoomName = selectedRoom ? selectedRoom.name : '';

  const closeBottomSheet = () => {
    setSelectedRoomJid(null);
    setBottomSheetVisible(false);
  };
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["4%", "60%", "95%"], []);
  const handleSheetChange = useCallback((index: any) => {
    
  }, []);
  
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    closeBottomSheet
  }, []);
  const openBottomSheet = (jid: string) => {
    setSelectedRoomJid(jid);
    setBottomSheetVisible(true);
    sheetRef.current?.snapToIndex(2);
  };

  const navigation = useNavigation<HomeStackNavigationProp>();
  return (
    <>
    <CreateNewChatButton
          onPress={() => navigation.navigate('NewChatScreen')}
        />
      <View style={{
        backgroundColor: "black",
      }} justifyContent={'center'} alignItems={'center'} w={'full'}>
      
        <FlatList
          nestedScrollEnabled={true}
          style={{width: '100%'}}
          data={sortedRoomsList}
          keyExtractor={(item: any) => `${item.jid}`}
          renderItem={({item, index}) => {
            const isFirstItem = index === 0;
            const isLast = index === sortedRoomsList.length -1 
            const itemStyle = isFirstItem ? { paddingTop: 50 } : isLast ? { paddingBottom: 120 } : {};
            return (
              <View style={itemStyle}>
                <RoomListItem
                  index={index}
                  length={sortedRoomsList.length}
                  counter={item.counter}
                  jid={item.jid}
                  onBottomSheetOpen={() => openBottomSheet(item.jid)}
                  name={item.name}
                  participants={item.participants}
                  key={item.jid}
                />
              </View>
            );
          }}
        />
      <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backgroundComponent={CustomBackground}
    >
      <BottomSheetView style={{ backgroundColor: 'transparent', flex: 1, borderTopLeftRadius: responsiveWidth(12) }}>
      <BlurView
        style={{ flex: 1 }}
        blurType="dark"
        blurAmount={8}
      >
          <View style={{
             flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <View style={{
            flexDirection: "row",
            padding: responsiveWidth(2),
          }}>
            <RoomListIcon
              name={selectedRoomName}
              jid={selectedRoomJid}
            />
            <Text
              height={responsiveHeight(4)}
              textAlign={'left'}
              paddingLeft={responsiveWidth(1)}
              fontWeight={'bold'}  // changed 600 to 'bold' for better compatibility
              fontSize={responsiveFontSize(2)}
              color="white"
            >
              {selectedRoomName}
            </Text>
            </View>
            <TouchableOpacity onPress={handleClosePress}>
            <Text
              textAlign={'left'}
              padding={responsiveWidth(1)}
              paddingLeft={responsiveWidth(1)}
              fontWeight={'bold'}
              fontSize={responsiveFontSize(2)}
              color="white"
            >
              Close
            </Text>
            </TouchableOpacity>
          </View>
          <MicComponent />
      </BlurView>
      </BottomSheetView>
    </BottomSheet>

      </View>

    </>
  );
});
