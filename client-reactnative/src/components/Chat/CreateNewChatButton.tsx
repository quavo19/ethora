import React from 'react';
import {Box, HStack, Text, View} from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {textStyles} from '../../../docs/config';
import {Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          
          rounded="full"
          justifyContent={'center'}
          alignItems="center"
          marginRight={2}>
          <Image 
                  style={{
                    
                    height: 90,
                    width: 130,
                    marginRight: 30
                  }}
                  source={require('../../assets/create.png')} />
                 
        </Box>
      </HStack>
    </TouchableOpacity>
    </View>
  );
};
