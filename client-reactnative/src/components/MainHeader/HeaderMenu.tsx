/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import {useNavigation} from '@react-navigation/native';
import {Box, Divider, Menu} from 'native-base';
import React, {useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  configDocuments,
  configNFT,
  itemsMintingAllowed,
} from '../../../docs/config';
import {useStores} from '../../stores/context';
import SubMenu from './SubMenu';
import {HomeStackNavigationProp} from '../../navigation/types';
import {homeStackRoutes} from '../../navigation/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../storyView/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface IMenuItem {
  value: string;
  label: string;
  visible: boolean;
  testID: string;
  icon: string;
}
[];

const LOGOUT = 'LOGOUT';
export const HeaderMenu = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [open, setOpen] = useState(false);

  const {loginStore, debugStore} = useStores();

  const AccountMenuItems: IMenuItem[] = [
    {value: homeStackRoutes.ProfileScreen, label: 'My profile', visible: true, testID: "itemProfileScreen", icon: require('../../assets/Profile.png')},
    {
      value: homeStackRoutes.TransactionsScreen,
      label: 'Transactions',
      visible: true,
      testID: "itemTransaction",
      icon: require('../../assets/PaperDocument.png')
    },
    // {value: homeStackRoutes.ACCOUNT, label: 'E-mails', visible: true},
    {
      value: homeStackRoutes.InviteFriendsScreen,
      label: 'Referrals',
      visible: true,
      testID: "itemReferrals",
      icon: require('../../assets/People.png')
    },
    {
      value: homeStackRoutes.CoinPurchaseScreen,
      label: 'Buy coins',
      visible: true,
      testID: "itemBuyCoins",
      icon: require('../../assets/Bag.png')
    },
  ];

  const ActionsMenuItems: IMenuItem[] = [
    {value: homeStackRoutes.NewChatScreen, label: 'New room', visible: true, testID: "itemNewRoom", icon: require('../../assets/Notes.png')},
    {value: homeStackRoutes.ScanScreen, label: 'QR Scan', visible: true, testID: "itemScanScreen", icon: require('../../assets/QRScanner.png')},
    {
      value: homeStackRoutes.MintScreen,
      label: 'Mint items',
      visible: itemsMintingAllowed && configNFT,
      testID: "itemMintItems",
      icon: require('../../assets/Tablet.png')
    },
    {
      value: homeStackRoutes.UploadDocumentsScreen,
      label: 'Upload Document',
      visible: configDocuments,
      testID: "itemUploadDocument",
      icon: require('../../assets/Document.png')
    },
  ];

  const SystemMenuItems: IMenuItem[] = [
    {
      value: homeStackRoutes.PrivacyAndDataScreen,
      label: 'Privacy and Data',
      visible: true,
      testID: "itemPrivacyData",
      icon: require('../../assets/Info.png')
    },
    {
      value: homeStackRoutes.AuthenticationScreen,
      label: 'Authentication',
      visible: true,
      testID: "itemAuthentication",
      icon: require('../../assets/Locked.png')
    },

    {
      value: homeStackRoutes.DebugScreen,
      label: 'Debug',
      visible: debugStore.debugMode,
      testID: "itemDebug",
      icon: require('../../assets/menuneon.png')
    },
    // {value: LOGOUT, label: 'Sign out', visible: true, testID: "itemTransaction"},
  ];

  const toggleMenu = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const onMenuItemPress = (value: string) => {
    if (value === LOGOUT) {
      loginStore.logOut();
    } else {
      navigation.navigate(value as never);
    }
  };
  return (
    <Box
      h="100%"
      w={50}
      alignItems="center"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        
        shadowOpacity: 0.7,
        shadowRadius: 6.27,

        elevation: 10,
      }}
      justifyContent={'center'}>
      <Menu
        accessibilityLabel="Menu"
        width={hp("40%")}
        testID='mainHeaderMenu'
        marginBottom={4}
        marginLeft={0}
        isOpen={open}
        backgroundColor={'rgba(0, 0, 0, 0.9)'}
        placement={'bottom'}
        onClose={() => setOpen(false)}
        trigger={triggerProps => {
          return (
            <TouchableOpacity
              {...triggerProps}
              testID='mainHeaderMenuButton'
              style={{zIndex: 99999}}
              onPress={() => toggleMenu()}
              accessibilityLabel="More options menu">
                <Image 
                  style={{
                    height: hp('7%'),
                    width: 80,
                    
                  }}
                  source={require('../../assets/menuneon.png')} />
            </TouchableOpacity>
          );
        }}>
          <ScrollView style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", }}>
        <SafeAreaView style={{
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50
        }}>
        <SubMenu
          title="ACCOUNT"
          menuItems={AccountMenuItems}
          onMenuItemPress={onMenuItemPress}
        />
        <Divider />
        <SubMenu
          title="ACTIONS"
          menuItems={ActionsMenuItems}
          onMenuItemPress={onMenuItemPress}
        />
        <Divider />
        <SubMenu
          title="ID"
          menuItems={SystemMenuItems}
          onMenuItemPress={onMenuItemPress}
        />
        <TouchableOpacity
          onPress={() => onMenuItemPress(LOGOUT)}
          style={[
            style.appButtonContainer,
           {marginTop: 50, margin: 10}

          ]}
        >
          <Image
          style={{
            width: 25,
            height: 25,
            transform: [{ rotate: '90deg' }],
          }}
          source={require("../../assets/logout.png")}
          />
          
          <Text style={[style.appButtonText, { fontSize: 18 }]}>
          Sign out
          </Text>
        </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
      </Menu>
    </Box>
  );
};
const style = StyleSheet.create({
  
  appButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    backgroundColor: "rgba(40,40,40, 0.9)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    padding: 8
  }
});