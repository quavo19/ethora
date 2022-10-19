import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import xmpp from "../../xmpp";
import {useStoreState} from "../../store";
import {Stack, Typography} from "@mui/material";
import {getBalance, getPublicProfile, getTransactions} from "../../http";
import {TProfile} from "../Profile/types";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import {differenceInDays, differenceInHours, format, formatDistance, subDays} from 'date-fns';
import { enUS } from 'date-fns/locale';

import {
    MainContainer,
    Avatar,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Conversation,
    ConversationList,
    Sidebar,
    Search,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    InfoButton,
    TypingIndicator,
    MessageSeparator,
    ExpansionPanel
} from '@chatscope/chat-ui-kit-react';
import {stringify} from "querystring";

export function ChatInRoom() {
    const [room, setRoom] = useState("");
    const messages = useStoreState((state) => state.historyMessages);
    const user = useStoreState((store) => store.user);
    const useChatRooms = useStoreState((store) => store.userChatRooms);
    const [profile, setProfile] = useState<TProfile>();
    const [myMessage, setMyMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState("");
    const [roomData, setRoomData] = useState<{ jid: string; name: string; room_background: string; room_thumbnail: string; users_cnt: string }>({
        jid: '',
        name: '',
        room_background: '',
        room_thumbnail: '',
        users_cnt: ''
    })
    const [loadingMore, setLoadingMore] = useState(false);

    const onYReachStart = () => {
        if (loadingMore) {
            return;
        }
        setLoadingMore(true);

        setTimeout(() => {
            const lastMessageID = messages.filter((item: any) => item.roomJID === currentRoom)[0].id;
            xmpp.getPaginatedArchive(currentRoom, String(lastMessageID));
            setLoadingMore(false);
        }, 1500);
    }

    useEffect(() => {
        getPublicProfile(user.walletAddress)
            .then((result) => {
                setProfile(result.data.result);
            });
    }, []);

    const onSubscribe = () => {
        const newCurrentRoom = room + '@conference.dev.dxmpp.com';
        setCurrentRoom(newCurrentRoom);

        if (messages.length > 0) {
            // getMoreMessages();
            console.log('delete', messages)
            useStoreState.getState().clearMessageHistory()
            return
        }

        xmpp.presenceInRoom(newCurrentRoom);
        xmpp.getRoomArchiveStanza(newCurrentRoom);
        console.log(messages)
    };

    const saveCurrentRoom = (room: string) => {
        setCurrentRoom(room)
    }

    const getMoreMessages = () => {
        // @ts-ignore
        xmpp.getPaginatedArchive(currentRoom, messages[0].id);
    };

    const testData = () => {
        console.log(messages)
    }

    const chooseRoom = (jid: string) => {
        setCurrentRoom(jid)
        setRoomData(useChatRooms.filter(e => e.jid === jid)[0])
        console.log(roomData, currentRoom)
    }

    const sendMessage = () => {
        let userAvatar = "";
        if (profile?.profileImage) {
            userAvatar = profile?.profileImage;
        }
        xmpp.sendMessage(currentRoom, user.firstName, user.lastName, userAvatar, user.walletAddress, myMessage)
    };

    return (
        <Box style={{height: "500px"}}>
            <MainContainer responsive>
                <Sidebar position="left" scrollable={false}>
                    <Search placeholder="Search..."/>
                    <ConversationList>
                        {useChatRooms.map(room =>
                            <Conversation active={room.jid === currentRoom} key={room.jid}
                                          onClick={() => chooseRoom(room.jid)} name={room.name}
                                          info={room.room_thumbnail !== "none" ? room.room_thumbnail : ""}>
                                <Avatar
                                    src={room.room_background !== "none" ? room.room_background : "https://icotar.com/initials/" + room.name}/>
                            </Conversation>
                        )}
                    </ConversationList>
                </Sidebar>

                <ChatContainer>
                    {roomData.name ?
                        <ConversationHeader>
                            <ConversationHeader.Back/>
                            <ConversationHeader.Content
                                userName={roomData.name}
                                info={'Active '+formatDistance(subDays(new Date(messages.filter((item: any) => item.roomJID === currentRoom).slice(-1)[0].date), 0), new Date(), { addSuffix: true })}
                            />
                            <ConversationHeader.Actions>
                                <BookmarkRemoveIcon/>
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                        : null}
                    <MessageList
                        loadingMore={loadingMore} onYReachStart={onYReachStart}
                        typingIndicator={<TypingIndicator content="Test is typing"/>}
                    >
                        {
                            messages.filter((item: any) => item.roomJID === currentRoom).map(message =>
                                < >
                                    {differenceInDays(new Date(), new Date(message.date)) === 1 ?
                                        <MessageSeparator>
                                            {format(new Date(message.date),  'LLL', { locale: enUS })} {format(new Date(message.date),  'dd,yyyy')}
                                        </MessageSeparator> : null
                                    }

                                <Message
                                    key={message.key}
                                    model={{
                                        sender: message.data.senderFirstName + ' ' + message.data.senderLastName,
                                        direction: xmpp.client.jid?.toString().split("/")[0] === message.data.senderJID.split("/")[0] ? "outgoing" : "incoming",
                                        position: 0,
                                    }}
                                >
                                    <Avatar
                                        src={message.data.photoURL ? message.data.photoURL : "https://icotar.com/initials/" + message.data.senderFirstName + "%20" + message.data.senderLastName}
                                        name={message.data.senderFirstName}/>
                                    <Message.CustomContent>
                                        <strong>{message.data.senderFirstName} {message.data.senderLastName}</strong><br/>
                                        {message.body}
                                    </Message.CustomContent>

                                    <Message.Footer sentTime={differenceInHours(new Date(), new Date(message.date)) > 5 ?
                                        format(new Date(message.date),  'h:mm a') :
                                        formatDistance(subDays(new Date(message.date), 0), new Date(), { addSuffix: true })} />

                                </Message>
                                </>
                            )
                        }
                        {messages.length <= 0 || !currentRoom ?
                            <MessageList.Content style={{
                                display: "flex",
                                "flexDirection": "column",
                                "justifyContent": "center",
                                height: "100%",
                                textAlign: "center",
                                fontSize: "1.2em"
                            }}>
                                {!currentRoom ? "To get started, please select a chat room." : null}
                                {messages.length <= 0 ? "Message list is empty" : null}
                            </MessageList.Content> : null
                        }
                    </MessageList>
                    {roomData.name ?
                        <MessageInput
                            placeholder="Type message here"
                            onChange={(val) => setMyMessage(val)}
                            onSend={sendMessage}
                        />
                        : null}
                </ChatContainer>
            </MainContainer>
        </Box>
    );
}
