import React from 'react';
import {Alert, Linking, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function SideDrawer({property}) {
  return (
    <DrawerContentScrollView {...property}>
      <DrawerItemList {...property} />
      <DrawerItem
        label=""
        onPress={() => Linking.openURL('https://github.com/sh5623/')}
        icon={() => (
          <Image
            style={{width: 30, height: 30}}
            source={require('../image/help.png')}
          />
        )}
      />
      <DrawerItem
        label=""
        onPress={() => Alert.alert('didden', 'Hi, we are didden!')}
        icon={() => (
          <Image
            style={{width: 30, height: 30}}
            source={require('../image/info.png')}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default SideDrawer;
