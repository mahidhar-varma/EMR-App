import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import axios from "axios";
import configData from "../../../config";
import * as ReactBootStrap from "react-bootstrap";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { categoriesList } from "../../data/homeArrays";
import styles from "./styles";
export default function HomeScreen(props) {
  const { navigation, route } = props;
  // const category = route.params.idName;
  // const [documentsList, setDocumentsList] = useState(null);
  // var [loading, setLoading] = useState(true);
  // var userId = "5";
  const loading = true;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => <View />,
    });
  }, []);

  //   const item = route?.params?.category;
  //   const recipesArray = getRecipes(item.id);

  const onPressDocument = (item) => {
    navigation.navigate(item.onPress, {});
    // navigation.setOptions({
    //   title: item.documenid,
    //   headerRight: () => <View />,
    // });
  };

  const renderDocuments = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressDocument(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={item.image} />
        <Text style={styles.title}>{item.displayName}</Text>
        {/* <Text style={styles.category}>{item.displayName}</Text> */}
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.mainBody}>
      {/* {console.log("test..",documentsList)} */}

      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"#fff"} />
      </View> */}

      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.image}
          source={require("../../../assets/icons/log2.png")}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 50 }}>
          Flipkart Health Locker
        </Text>
      </View>
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={categoriesList}
          renderItem={renderDocuments}
          keyExtractor={(item) => `${item.documentId}`}
        />
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
// image: {
//   marginBottom: 40,
//   height: 100,
//   resizeMode: "contain",
// },
// });
