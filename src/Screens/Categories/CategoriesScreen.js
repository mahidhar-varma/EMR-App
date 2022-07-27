import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList,Button, Image, View, Platform, Text , StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from "./styles";
import { categories } from "../../data/dataArrays";

export default function CategoriesScreen(props) {
  const {navigation} = props
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const idName = item.idName;
    navigation.navigate("DocumentsListScreen", { idName });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        {/* <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} /> */}
        <Text style={styles.categoriesName}>{item.displayName}</Text>
        <Text style={styles.categoriesInfo}>No. of Documents</Text>
      </View>
    </TouchableHighlight>
  );


  return (
    <View>
      <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item.idName}`} />
    </View>
  );
}
