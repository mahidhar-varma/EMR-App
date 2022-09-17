import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import axios from "axios";
import configData from "../../../config";
import * as ReactBootStrap from "react-bootstrap";
import { ActivityIndicator } from "react-native";
import { profileList } from "../../data/profileArray";

export default function ProfilesScreen(props) {
  const { navigation, route } = props;
  // const category = route.params.idName;
  const [documentsList, setDocumentsList] = useState(null);
  var [loading, setLoading] = useState(true);
  var userId = "5";

  const getDocuments = async () => {
    try {
      setLoading(false);
      let formData = new FormData();
      formData.append("category", category);
      var bodyData = {
        userId: userId,
        category: category,
      };

      console.log(configData["serverUrl"] + "/documents", bodyData);
      await fetch(
        configData["serverUrl"] +
          "/documents?userId=" +
          userId +
          "&category=" +
          category,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(function (response) {
          // console.log("response data", response);
          return response.json();
        })
        .catch(function (error) {
          console.log("-------- error0 ------- " + error);
          alert("result:" + error);
        })
        .then(function (result) {
          setDocumentsList(result["data"]);
          console.log("returned json", result["data"]);
          //console.log('response data', documentsList)
          setLoading(true);
        })
        .catch(function (error) {
          console.log("-------- error ------- " + error);
          alert("result:" + error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    // getDocuments(category);
    navigation.setOptions({
      title: "Profiles",
      headerRight: () => <View />,
    });
  }, []);

  //   const item = route?.params?.category;
  //   const recipesArray = getRecipes(item.id);

  const onPressProfile = (item) => {
    var profileId = item.profileId;
    navigation.navigate("HomeScreen", { item, profileId });
    navigation.setOptions({
      title: item.profileName,
      headerRight: () => <View />,
    });
  };

  const renderProfiles = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressProfile(item)}
    >
      <View style={styles.container}>
        {item.gender == "male" ? (<Image
          style={styles.photo}
          source={require("../../../assets/icons/profile-icon.png")}
        />):(<Image
          style={styles.photo}
          source={require("../../../assets/icons/profile-icon.png")}
        />)}
        <Text style={styles.title}>{item.profileName}</Text>
        {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {/* {console.log("test..",documentsList)} */}
      {!loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"#fff"} />
        </View>
      ) : null}
      {loading ? (
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={profileList}
            renderItem={renderProfiles}
            keyExtractor={(item) => `${item.documentId}`}
          />
        </View>
      ) : null}
    </View>
  );
}

