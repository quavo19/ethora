import React from 'react';
import {Box, HStack, Text, View} from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {textStyles} from '../../../docs/config';
import {Image, TouchableOpacity} from 'react-native';

export interface ICreateNewChatButton {
  onPress: () => void;
}

export const CreateNewChatButton: React.FC<ICreateNewChatButton> = ({
  onPress,
}) => {
  return (
    <View style={{
      position: "absolute",
      top: 30,
      zIndex: 10,
      left: 0,
      width: 90,
      
    }}>
      <TouchableOpacity onPress={onPress} style={{padding: 5, paddingLeft: 15}}>
      <HStack>
        <Box
          w={hp('5.5%')}
          h={hp('5.5%')}
          rounded="full"
          justifyContent={'center'}
          alignItems="center"
          marginRight={2}>
          <Image 
              style={{
              height: 100,
              width: 55,
            }}
            source={require('../../assets/create.png')} />                
        </Box>
      </HStack>
    </TouchableOpacity>
    </View>
  );
};
