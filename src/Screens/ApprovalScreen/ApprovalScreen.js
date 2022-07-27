import React, { Component, useState, useEffect } from "react";
import {
  Text,
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  TextInput,
  Drop,
  TouchableOpacity,
} from "react-native";
import { DateTimePicker } from "@react-native-community/datetimepicker";
import moment from "moment";
import DropdownComponent from "./Dropdown";
import styles from "./styles";
import configData from "../../../config";

export default function ApprovalScreen(props) {
  const { navigation, route } = props;
  var [loading, setLoading] = useState(false);
  console.log("route", route);
  var fileUploaded = route.params["fileUri"];
  var documentName = route.params["name"];
  var doctorName = "";
  var hospitalName = "";
  var issueDate = "2020-11-18";
  const [dialog, setDialog] = useState(true);
  var category = route.params["category"];
  console.log("params", fileUploaded, category, documentName);
  const [inputCategory, setInputCategory] = useState(category);
  var userId = route.params["userId"];

  useEffect(
    (inputCategory) => {
      Alert.alert(
        "Confirm Category",
        "Category Name:  " + inputCategory,
        [
          {
            text: "Confirm",
            onPress: () => {
              setDialog(false);
            },
          },
          {
            text: "Change",
            onPress: () => {
              setDialog(true);
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    },
    [inputCategory]
  );
  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "jpg":
        return "image/jpeg";
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
    }
  };

  const uploadDocument = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      const fileUri = fileUploaded;
      let filename = fileUri.split("/").pop();

      const extArr = /\.(\w+)$/.exec(filename);
      const type = getMimeType(extArr[1]);

      formData.append("file", { uri: fileUri, name: filename, type });
      formData.append("documentName", documentName);
      formData.append("userId", userId);
      formData.append("category", inputCategory);
      formData.append("issuedDate", issueDate);
      formData.append("doctorName", doctorName);
      formData.append("hospitalName", hospitalName);
      formData.append("source", "user");

      console.log(configData["serverUrl"] + "/documents");
      await fetch(configData["serverUrl"] + "/documents", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log("response data", response);
          return response.json();
        })
        .catch(function (error) {
          console.log("-------- error0 ------- " + error);
          alert("result:" + error);
        })
        .then(function (result) {
          console.log("returned body", result);
          //console.log('response data', documentsList)
          setLoading(false);
          alert("Upload Successful");
          navigation.navigate("UploadScreen", {});
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
    <View style={styles.containerStyle}>
      {!loading && !loading && dialog && (
        <DropdownComponent
          onChange={(item) => {
            setInputCategory(item.value);
            setIsFocus(false);
          }}
        />
      )}

      {!loading && !dialog && (
        <View style={styles.container}>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={inputCategory}
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {}}
          />
        </View>
      )}

      {/* <TextInput
        style={styles.input}
        placeholder="Enter Document Name"
        mode="outlined"
        activeUnderlineColor="green"
        onChangeText={(value) => {
          value ? setName(value) : alert("Document name cannot be empty!!");
        }}
      /> */}
      {!loading && (
        <TextInput
          style={styles.input}
          placeholder="Enter Hospital/Lab Name"
          mode="outlined"
          activeUnderlineColor="green"
          onChangeText={(value) => {
            value
              ? (hospitalName = value)
              : alert("Hospital/Lab name cannot be empty!!");
          }}
        />
      )}
      {!loading && (
        <TextInput
          style={styles.input}
          placeholder="Enter Doctor Name"
          mode="outlined"
          activeUnderlineColor="green"
          onChangeText={(value) => {
            value
              ? (doctorName = value)
              : alert("Doctor name cannot be empty!!");
          }}
        />
      )}

      {!loading && (
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={uploadDocument}
        >
          <Text style={styles.buttonTextStyle}>Upload Document</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   buttonStyle: {
//     backgroundColor: "#307ecc",
//     borderWidth: 0,
//     color: "#FFFFFF",
//     borderColor: "#307ecc",
//     height: 40,
//     alignItems: "center",
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 15,
//   },
//   buttonTextStyle: {
//     color: "#FFFFFF",
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   textStyle: {
//     backgroundColor: "#fff",
//     fontSize: 15,
//     marginTop: 16,
//     marginLeft: 35,
//     marginRight: 35,
//     textAlign: "center",
//   },
//   input: {
//     borderColor: "gray",
//     // width: "100%",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 16,
//     marginLeft: 35,
//     marginRight: 35,
//     marginBottom: 30,
//   },
//   containerStyle: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   horizontalStyle: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 11,
//   },
// });
