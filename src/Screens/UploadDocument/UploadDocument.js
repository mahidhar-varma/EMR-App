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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import MenuImage from "../../components/MenuImage/MenuImage";
import configData from "../../../config";
import { ActivityIndicator } from "react-native";

export default function UploadScreen(props) {
  const { navigation } = props;
  const [name, setName] = useState("");
  var [loading, setLoading] = useState(false);
  var userId = configData.userId;
  var dialog = 0;
  useLayoutEffect(() => {
    navigation.setOptions({
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

  const [file, setFile] = useState(null);
  const [uploading, startUploading] = useState(false);
  const YOUR_SERVER_URL = configData.serverUrl + "/documents/getCategory";
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
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

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    console.log(result);

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  const nameError = () => {
    Alert.alert(
      "A document with this name already exists",
      "",
      [
        {
          text: "Close",
          onPress: () => {
            // setDialog(true);
            navigation.navigate("UploadScreen", {});
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const showError = () => {
    Alert.alert(
      "Error occured while uploading document",
      "",
      [
        {
          text: "Close",
          onPress: () => {
            // setDialog(true);
            navigation.navigate("UploadScreen", {});
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };


  const checkCategory = (fileUri, name, userId, category, fileType) => {
    const data1 = {
      Diagnostic_Report: "Diagnostic Report",
      Prescription: "Prescription",
      Discharge_Summary: "Discharge Summary",
      Immunization_Report: "Immunization Report",
      Other: "Other",
    };
    console.log("category..", category, data1[category]);
    Alert.alert(
      "Confirm Category",
      "Category Name:  " + data1[category],
      [
        {
          text: "Change",
          onPress: () => {
            // setDialog(true);
            dialog = 1;
            navigation.navigate("ApprovalScreen", {
              fileUri,
              name,
              category,
              userId,
              category,
              dialog,
              fileType
            });
          },
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            // setDialog(false);
            dialog = 0;
            navigation.navigate("ApprovalScreen", {
              fileUri,
              name,
              category,
              userId,
              category,
              dialog,
              fileType
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const uploadFile = async () => {
    if (name && file) {
      setLoading(true);
      const fileUri = file;
      let filename = fileUri.split("/").pop();

      const extArr = /\.(\w+)$/.exec(filename);
      const type = getMimeType(extArr[1]);
      setFile(null);
      startUploading(true);

      let formData = new FormData();

      formData.append("file", { uri: fileUri, name: filename, type });

      formData.append("documentName", name);

      formData.append("userId", userId);
      console.log("print2");
      console.log(YOUR_SERVER_URL);
      var response;
      try {
        response = await fetch(YOUR_SERVER_URL, {
          method: "POST",
          body: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            if (result && result["message"] == "name error") {
              // alert("Document with this name exists!!");
              // navigation.navigate("UploadScreen", {});
              setLoading(false);
              nameError();
            } else {
              setLoading(false);
              const category = result["category"];
              const fileType = result["fileType"];

              checkCategory(fileUri, name, userId, category, fileType);
            }
            console.log(result);
          })
          .catch(function (error) {
            console.log("-------- error ------- " + error);
            // alert("result:" + error);
            setLoading(false);
            showError();
          });
      } catch (exception) {
        console.log(exception);
      }

      startUploading(false);
      console.log("print3");
      let responseAgain = response;
      console.log(responseAgain);
      return response;
    }
    if (!name) {
      alert("Document name cannot be empty!!");
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
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../../../assets/icons/log2.png")}
          />
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            Upload Document
          </Text>
          <Text
            style={{
              fontSize: 30,
              marginTop: 0,
              marginBottom: 40,
              textAlign: "center",
            }}
          ></Text>
        </View>
      )}

      {loading && (
        <View style={[styles.containerStyle, styles.horizontalStyle]}>
          <ActivityIndicator animating={true} size="large" color="blue" />
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter Document Name"
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {
              value ? setName(value) : alert("Document name cannot be empty!!");
            }}
          />
        </View>
      )}

      {/*Showing the data of selected Single file*/}
      {!loading && (
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={pickFile}
          >
            <Text style={styles.buttonTextStyle}>Select File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={uploadFile}
          >
            <Text style={styles.buttonTextStyle}>Upload File</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  image: {
    marginBottom: 40,
    height: 100,
    resizeMode: "contain",
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
  },
  horizontalStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 11,
  },
});
// AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);