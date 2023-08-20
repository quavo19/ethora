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
        backgroundColor={"gray.500"}
        height={hp('3%')}
        width={hp('3%')}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        textAlign={'center'}
        position={'relative'}
        accessibilityLabel={'Thumbnail'}
        borderRadius={hp('50%')}>
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
  chatHomeItemIcon: {
    borderColor: commonColors.primaryDarkColor,
    backgroundColor: commonColors.primaryDarkColor,
    height: hp('5.54%'),
    width: hp('5.54%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    borderRadius: hp('0.7%'),
  },
  imageBg: {
    height: hp('5.5%'),
    width: hp('5.5%'),
    // flex: 1,
    borderRadius: 5,
    // position: 'absolute',
  },
  fullName: {
    color: 'white',
    fontSize: 20,
    marginRight: 3,
    fontFamily: textStyles.boldFont,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: 1,
    alignSelf: 'flex-end',
    height: hp('5.5%'),
    width: hp('5.5%'),
    marginTop: hp('1%'),
    marginRight: hp('0.5'),
    position: 'absolute',
  },
  counterInnerContainer: {
    height: hp('2.1%'),
    width: hp('2.1%'),
    borderRadius: hp('2.1') / 2,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontFamily: textStyles.regularFont,
    fontSize: hp('1.2%'),
    color: '#FFFFFF',
  },
});
