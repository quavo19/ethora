import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import { MainHeader } from '../../components/MainHeader/MainHeader';
import {View} from 'native-base';
import React from 'react';

import {RoomsTabBar} from '../../components/RoomList/RoomsTabBar';
import {HomeStackParamList} from '../../navigation/types';
type ScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'RoomsListScreem'
>;

const RoomListScreen = observer(({}: ScreenProps) => {
  return (
    <View flex={1} backgroundColor={'white'}>
      <RoomsTabBar />
      <MainHeader />
    </View>
  );
});

export default RoomListScreen;
