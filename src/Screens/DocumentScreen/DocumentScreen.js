import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  Image,
  TextInput,
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import MenuImage from "../../components/MenuImage/MenuImage";
import configData from "../../../config";
import { ActivityIndicator } from "react-native";

export default function DocumentScreen(props) {
  const { navigation, route } = props;
  const [name, setName] = useState("");
  console.log("route", route);
  const category = route.params.item.category;
  const documentName = route.params.item.documentName;
  const documentId = route.params.item.documentId;
  userId = route.params["userId"];
  var [loading, setLoading] = useState(false);
  var [URL, setURL] = useState("");

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <MenuImage
  //         onPress={() => {
  //           navigation.openDrawer();
  //         }}
  //       />
  //     ),
  //     headerRight: () => <View />,
  //   });
  // }, []);

  const [file, setFile] = useState(null);
  const [uploading, startUploading] = useState(false);
  const YOUR_SERVER_URL = configData.serverUrl + "/documents";

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    console.log(result);

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };
  const data1 = {
    Diagnostic_Report: "Diagnostic Report",
    Prescription: "Prescription",
    Discharge_Summary: "Discharge Summary",
    Immunization_Report: "Immunization Report",
    Other: "Other",
  };
  const downloadUrl = () => {
    console.log("category..", category, data1[category]);
    Alert.alert(
      "File downloaded successfully..",
      "",
      [
        {
          text: "Ok",
          onPress: () => {
            // setDialog(true);
            // dialog = 1;
            // navigation.navigate("ApprovalScreen", {
            //   fileUri,
            //   name,
            //   category,
            //   userId,
            //   category,
            //   dialog,
            // });
          },
          style: "cancel",
        },
        // {
        //   text: "Confirm",
        //   onPress: () => {
        //     // setDialog(false);
        //     dialog = 0;
        //     navigation.navigate("ApprovalScreen", {
        //       fileUri,
        //       name,
        //       category,
        //       userId,
        //       category,
        //       dialog,
        //     });
        //   },
        // },
      ],
      { cancelable: false }
    );
  };

  const getURL = async () => {
    try {
      setLoading(false);
      console.log(
        configData["serverUrl"] +
          "/documents/" +
          documentId +
          "?userId=" +
          userId +
          "&category=" +
          category
      );
      await fetch(
        configData["serverUrl"] +
          "/documents/" +
          documentId +
          "?userId=" +
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
          console.log("response data", response);
          return response.json();
        })
        .catch(function (error) {
          console.log("-------- error0 ------- " + error);
          alert("result:" + error);
        })
        .then(function (result) {
          setURL(result["url"]);

          console.log("returned url", result["url"]);
          Linking.openURL(result["url"]);
          downloadUrl();
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

  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button title="Pick a Photo from mobile" onPress={pickImage} />
    //   {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    //   <View style={{ height: 50 }}/>
    //   <Button title="Pick a file from mobile" onPress={pickFile} />
    //   <View style={{ height: 50 }}/>
    //   { uploading ? <Text>Uploading</Text> :
    //   <Button title="Upload" onPress={uploadFile} /> }
    // </View>

    <View style={styles.mainBody}>
      {!loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"#fff"} />
        </View>
      )}

      <View
        style={{ marginTop: 0, alignItems: "center", justifyContent: "center" }}
      >
        {!loading && (
          <Text style={styles.headline}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                textDecorationLine: "underline",
                marginTop: 16,
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Document details{"\n"}
              {"\n"}
            </Text>
            <Text style={{ marginTop: 49, paddingTop: 30, fontWeight: "bold" }}>
              Document Name:{" "}
            </Text>
            <Text>
              {documentName}
              {"\n"}
              {"\n"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>Category: </Text>
            <Text>
              {data1[category]}
              {"\n"}
            </Text>
            {/* <Text style={{fontWeight: "bold"}}>Document Name:    </Text><Text>{documentName}{'\n'}</Text> */}
          </Text>
        )}
      </View>
      {!loading && (
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              getURL();
            }}
          >
            <Text style={styles.buttonTextStyle}>Download</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {}}
          >
            <Text style={styles.buttonTextStyle}>Share</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: "#fff",
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: "center",
  },
  input: {
    borderColor: "gray",
    // width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 30,
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 11,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: '#F4F7F5',
    justifyContent: "center",
    alignItems: "center",
  },

  headline: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 0,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 30,
    backgroundColor: "#F4F7F5",
    justifyContent: "center",
    textAlign: "center",
    height: "50%",
    width: "100%",
  },
});
// AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
