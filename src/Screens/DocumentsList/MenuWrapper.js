import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { Divider, IconButton } from "react-native-elements";
import { Menu } from "react-native-paper";

export default function MenuWrapper(props) {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          {...props}
          icon="dots-vertical"
          onPress={openMenu}
        ></IconButton>
      }
    >
      <Menu.Item onPress={() => {}} title="Düzenle" />
      <Divider style={{ height: 1, color: "black", width: "100%" }} />
      <Menu.Item onPress={() => {}} title="Sil" />
    </Menu>
  );
}
