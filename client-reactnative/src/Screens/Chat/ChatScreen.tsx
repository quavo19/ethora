import { observer } from "mobx-react-lite";
import React, { useEffect, useCallback, useRef, useMemo  } from "react";
import { StyleSheet, Text, Button, SafeAreaView } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useStores } from "../../stores/context";
import { MultiStoryScreen } from "../../components/storyView/modules";
import { getRoomArchiveStanza, getPaginatedArchive } from "../../xmpp/stanzas";
import ChatContainer from "../../components/Chat/ChatContainer";
import { IMessage, roomListProps } from "../../stores/chatStore";
import { View } from "native-base";

const ChatScreen2 = observer(({ route }: any) => {
  const { chatStore } = useStores();

  const { chatJid, chatName } = route.params;
  const room: roomListProps = chatStore.roomList.find(
    (item) => item.jid === chatJid
  ) || {
    avatar: "",
    counter: 0,
    createdAt: "",
    jid: chatJid,
    lastUserName: "",
    lastUserText: "",
    name: chatName ? chatName : "",
    participants: 0,
    isFavourite: false,
    muted: false,
    priority: 0,
    roomBackground: "",
    roomBackgroundIndex: 0,
    roomThumbnail: "",
  };
  const messages = chatStore.messages
    .filter((item: IMessage) => {
      if (item.roomJid === chatJid) {
        if (item.isReply) {
          if (item.showInChannel) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    })
    .sort((a: any, b: any) => b._id - a._id);

  //this will ensure that when chat screen is opened then message badge counter should stop counting
  useEffect(() => {
    chatStore.toggleShouldCount(false);
    return () => {
      chatStore.toggleShouldCount(true);
    };
  }, []);

  //everytime chat room changes message archive is called for the corresponing room
  useEffect(() => {
    if (!chatStore.roomsInfoMap?.[chatJid]?.archiveRequested) {
      getRoomArchiveStanza(chatJid, chatStore.xmpp);
    }
  }, [chatJid]);

  useEffect(() => {
    const lastMessage = messages?.[0];
    lastMessage &&
      chatStore.updateRoomInfo(chatJid, {
        archiveRequested: true,
        lastUserText: lastMessage?.text,
        lastUserName: lastMessage?.user?.name,
        lastMessageTime:
          lastMessage?.createdAt &&
          format(new Date(lastMessage?.createdAt), "hh:mm"),
      });
  }, [!!messages]);
 
  const onLoadEarlier = () => {
    const lastMessage = messages.length - 1;
    if (messages.length > 5) {
      getPaginatedArchive(chatJid, messages[lastMessage]._id, chatStore.xmpp);
      chatStore.setChatMessagesLoading(true);
    }
  };

  return (
    <View testID="ChatScreen">
      
      <SafeAreaView style={styles.safeArea}>
      <View style ={{
        position: "absolute",
        top: 70,
        bottom: 0,      
      }}>
        
        <MultiStoryScreen/>
      </View>
      <View style={styles.container}>
        <View
       style={{
        position: "relative",
        height: "100%",
        
       }} 
      >
        
        <ChatContainer
        containerType="main"
        roomDetails={room}
        messages={messages}
        onLoadEarlier={onLoadEarlier}
      />
      
      </View>
      
    </View>
    </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 280,
    height: "83.5%"
  },
  safeArea: {
    backgroundColor: "black"
  }
});
export default ChatScreen2;
