import React from 'react';
import {Box, HStack, Text, View} from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {textStyles} from '../../../docs/config';
import {TouchableOpacity} from 'react-native';

export interface ICreateNewChatButton {
  onPress: () => void;
}

export const CreateNewChatButton: React.FC<ICreateNewChatButton> = ({
  onPress,
}) => {
  return (
    <View style={{
      position: "absolute",
      top: 780,
      left: 350,
      zIndex: 10,
    }}>
      <TouchableOpacity onPress={onPress} style={{padding: 10, paddingLeft: 15, minHeight:hp("9%"), width:wp("100%")}}>
      <HStack alignItems={'center'}>
        <Box
          w={hp('5.5%')}
          h={hp('5.5%')}
          bg={'#64BF7C'}
          rounded="full"
          justifyContent={'center'}
          alignItems="center"
          marginRight={2}>
          <AntDesign name="plus" color={'#FFF'} size={hp('4.3%')} />
        </Box>
      </HStack>
    </TouchableOpacity>
    </View>
  );
};
