/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import {Box, Menu, Text, View, Image} from 'native-base';
import React from 'react';
import {textStyles} from '../../../docs/config';
import { IMenuItem } from './HeaderMenu';
import { StyleSheet } from 'react-native';

interface SubMenuProps {
  title: string;
  menuItems: IMenuItem[];
  onMenuItemPress: (value: string) => void;
}
const SubMenu = (props: SubMenuProps) => {
  const {title, menuItems, onMenuItemPress} = props;

  return (
    <Box padding={2} width={'100%'}>
      <Text style={[style.appButtonText]} color={"white"} fontFamily={textStyles.semiBoldFont}>{title}</Text>
      {menuItems.map(
        (item: {value: string; label: string; visible: boolean, testID:string, icon:string}) => {
          if (!item.visible) return null;
          return (
            <View style={[
              style.appButtonContainer,
             {marginTop: 10, margin: 10}
  
            ]}>
              <Image
          style={{
            width: 25,
            height: 25,
            
          }}
          source={item.icon}
          />
              <Menu.Item
                accessibilityLabel={item.label}
                _text={{
                  fontFamily: textStyles.lightFont,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15
                }}
                
                testID={item.testID}
                onPress={() => onMenuItemPress(item.value)}
                key={item.label}>
                {item.label}
              </Menu.Item>
            </View>
          );
        },
      )}
    </Box>
  );
};

const style = StyleSheet.create({
  
  appButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 30,
    elevation: 8,
    backgroundColor: "rgba(20,20, 20, 0.9)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    color: "#fff",
    fontWeight: "bold",
    
    textTransform: "uppercase",
    padding: 8,
    fontSize: 15
  }
});

export default SubMenu;
