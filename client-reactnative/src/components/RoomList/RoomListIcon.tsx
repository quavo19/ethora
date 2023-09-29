/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import React from 'react';
import {StyleSheet} from 'react-native';
import {commonColors, textStyles} from '../../../docs/config';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Box, Text} from 'native-base';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../stores/context';
import FastImage from 'react-native-fast-image';

export const RoomListIcon = observer(
  ({name, jid}: {name: string; jid:string}) => {
    const {chatStore} = useStores();
    const room = chatStore.roomList.find(item => item.jid === jid);
    return (
      <Box
        shadow={'2'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        textAlign={'center'}
        position={'relative'}
        accessibilityLabel={'Thumbnail'}
        >
        {room?.roomThumbnail ? (
          <FastImage
            source={{
              uri: room.roomThumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: hp('3%'),
              height: hp('3%'),
              borderRadius: hp('50.7%'),
            }}
          />
        ) : (
          <Text style={styles.fullName}>
            {name && name[0] + (name[1] ? name[1] : '')}
          </Text>
        )}
        
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  
  fullName: {
    color: 'white',
    fontSize: 20,
    marginRight: 3,
    fontFamily: textStyles.boldFont,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
