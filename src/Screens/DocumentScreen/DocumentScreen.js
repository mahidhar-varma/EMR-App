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
  Share
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import MenuImage from "../../components/MenuImage/MenuImage";
import configData from "../../../config";
import { ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
// import Share from "react-native-share";

export default function DocumentScreen(props) {
  const { navigation, route } = props;
  const [name, setName] = useState("");
  console.log("route..................", route);
  const category = route.params.item.category;
  var [documentName, setDocumentName] = useState(
    route.params.item.documentName
  );

  const documentId = route.params.item.documentId;
  console.log('document id....', documentId,'&& ',route.params.item.documentId)
  const fileType = route.params.item.fileType;
  var [hospitalName, setHospitalName] = useState(
    route.params.item.hospitalName
  );
  var [doctorName, setDoctorName] = useState(route.params.item.doctorName);
  var issuedDate = route.params.item.issuedDate;
  var [isEditable, setIsEditable] = useState(false);

  var [mydate, setDate] = useState(new Date());
  var [displaymode, setMode] = useState("date");
  var [isDisplayDate, setShow] = useState(false);
  var [value, setValue] = useState(null);
  var [isFocus, setIsFocus] = useState(false);

  var userId = route.params["userId"];
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

  const init = () => {
    // var v1 = route.params.item.documentName;
    // setDocumentName(v1);
    // setHospitalName(route.params.item.hospitalName);
    // setDoctorName(route.params.item.doctorName);
    // setIssuedDate(route.params.item.issuedDate);
  };
  console.log("Document Name:   ", documentName);

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    issuedDate = currentDate;
    setShow(false);
  };
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*"
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
    Other: "Other"
  };
  const m = moment(mydate, "YYYY-MM-DD").format().toString();
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
          style: "cancel"
        }
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
var text='Follow the link to download document..';
const ShareDocument = async (url) => {
  try {
    const result = await Share.share({
      message: 'Follow the link to download document "'+documentName+'"'+url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
  
  const shareURL = async () => {
    try {
      setLoading(true);
      console.log(
        configData["serverUrl"] +
          "/documents/" +
          documentId +
          "?userId=" +
          userId +
          "?category=" +
          category +
          "&fileType=" +
          fileType
      );
      await fetch(
        configData["serverUrl"] +
          "/documents/" +
          documentId +
          "?userId=" +
          userId +
          "&category=" +
          category +
          "&fileType=" +
          fileType,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
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
          setURL(result["url"]);

          console.log("returned url", result["url"]);
          ShareDocument(result["url"]);
          // Linking.openURL(result["url"]);
          // downloadUrl();
          //console.log('response data', documentsList)
          setLoading(false);
        })
        .catch(function (error) {
          console.log("-------- error ------- " + error);
          alert("result:" + error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getURL = async () => {
    try {
      setLoading(true);
      console.log(
        configData["serverUrl"] +
          "/documents/" +
          documentId +
          "?userId=" +
          userId +
          "?category=" +
          category +
          "&fileType=" +
          fileType
      );
      await fetch(
        configData["serverUrl"] +
          "/documents/" +
          documentId +
          "?userId=" +
          userId +
          "&category=" +
          category +
          "&fileType=" +
          fileType,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
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
          setURL(result["url"]);

          console.log("returned url", result["url"]);
          Linking.openURL(result["url"]);
          downloadUrl();
          //console.log('response data', documentsList)
          setLoading(false);
        })
        .catch(function (error) {
          console.log("-------- error ------- " + error);
          alert("result:" + error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const showError = (error) => {
    Alert.alert(
      error,
      "",
      [
        {
          text: "Close",
          onPress: () => {
            // setDialog(true);
            navigation.navigate("CategoriesScreen", {});
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const showEditSuccess = () => {
    Alert.alert(
      "Edit Successful",
      "",
      [
        {
          text: "Close",
          onPress: () => {
            // setDialog(true);
            navigation.navigate("CategoriesScreen", {});
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const showDeleteSuccess = () => {
    Alert.alert(
      "Delete Successful",
      "",
      [
        {
          text: "Close",
          onPress: () => {
            // setDialog(true);
            navigation.navigate("CategoriesScreen", {});
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const editDocument = async () => {
    try {
      setLoading(true);
      console.log(configData["serverUrl"] + "/documents/" + documentId);
      issuedDate = moment(mydate, "YYYY-MM-DD")
        .format()
        .toString()
        .split("T", [1])
        .toString();
      var bodyData = {
        userId: userId,
        category: category,
        hospitalName: hospitalName,
        doctorName: doctorName,
        documentName: documentName,
        issuedDate: issuedDate
      };
      console.log("request body.......", bodyData);
      await fetch(configData["serverUrl"] + "/documents/" + documentId, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          // console.log("response data", response);
          return response.json();
        })
        .catch(function (error) {
          console.log("-------- error0 ------- " + error);
          showError("Error while updating document");
        })
        .then(function (result) {
          console.log("returned response", result);
          console.log("Edit Successful..");
          //console.log('response data', documentsList)
          setLoading(false);
          setIsEditable(false);
          showEditSuccess();
        })
        .catch(function (error) {
          console.log("-------- error ------- " + error);
          alert("result:" + error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDocument = async () => {
    try {
      setLoading(true);
      console.log(configData["serverUrl"] + "/documents/" + documentId);
      var bodyData = {
        userId: userId,
        category: category,
        fileType: fileType
      };
      await fetch(configData["serverUrl"] + "/documents/" + documentId, {
        method: "DELETE",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          // console.log("response data", response);
          return response.json();
        })
        .catch(function (error) {
          console.log("-------- error0 ------- " + error);
          showError("Error while updating document");
        })
        .then(function (result) {
          console.log("returned response", result);
          console.log("Edit Successful..");
          //console.log('response data', documentsList)
          setLoading(false);
          showDeleteSuccess();
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
      {!loading ? (
        <View>
          <Text style={styles.textStyle}>Category:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            placeholderTextColor="black"
            placeholder={category}
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {}}
          />
        </View>
      ) : null}

      {!loading ? (
        <View>
          <Text style={styles.textStyle}>Document Name:</Text>
          <TextInput
            style={styles.input}
            editable={isEditable}
            placeholderTextColor={isEditable ? "gray" : "black"}
            placeholder={route.params.item.documentName}
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {
              value
                ? setDocumentName(value)
                : alert("Document name cannot be empty!!");
            }}
          />
        </View>
      ) : null}
      {!loading ? (
        <View>
          <Text style={styles.textStyle}>Hospital Name:</Text>
          <TextInput
            style={styles.input}
            editable={isEditable}
            placeholderTextColor={isEditable ? "gray" : "black"}
            placeholder={route.params.item.hospitalName}
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {
              value
                ? setHospitalName(value)
                : alert("Hospital name cannot be empty!!");
            }}
          />
        </View>
      ) : null}

      {!loading ? (
        <View>
          <Text style={styles.textStyle}>Doctor Name:</Text>
          <TextInput
            style={styles.input}
            editable={isEditable}
            placeholderTextColor={isEditable ? "gray" : "black"}
            placeholder={route.params.item.doctorName}
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {
              value
                ? setDoctorName(value)
                : alert("Doctor name cannot be empty!!");
            }}
          />
        </View>
      ) : null}

      {!loading ? (
        !isEditable ? (
          <View>
            <Text style={styles.textStyle}>Issued date:</Text>
            <TextInput
              style={styles.input}
              editable={isEditable}
              placeholderTextColor={isEditable ? "white" : "black"}
              placeholder={route.params.item.issuedDate}
              mode="outlined"
              activeUnderlineColor="green"
            />
          </View>
        ) : null
      ) : (
        !loading && (
          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={1}
              onPress={() => {
                setShow(true);
              }}
              title="Show date picker!"
            >
              <Text style={styles.buttonTextStyle}>Date Of Issue:</Text>
            </TouchableOpacity>
          </View>
        )
      )}
      {!loading && isEditable ? (
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={1}
            onPress={() => {
              setShow(true);
            }}
            title="Show date picker!"
          >
            <Text style={styles.buttonTextStyle}>Date Of Issue</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isDisplayDate && isEditable ? (
        <DateTimePicker
          testID="dateTimePicker"
          maximumDate={new Date()}
          value={mydate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
        />
      ) : null}
      {!loading && isEditable ? (
        <Text
          style={styles.input1}
          mode="outlined"
          activeUnderlineColor="green"
        >
          {m.split("T", [1]).toString()}
        </Text>
      ) : null}
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"#fff"} />
        </View>
      )}

      <View
        style={{ marginTop: 0, alignItems: "center", justifyContent: "center" }}
      >
        {/* {!loading && (
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
            <Text style={{ fontWeight: "bold" }}>Doctor name: </Text>
            <Text>
              {data1[category]}
              {"\n"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>Hospital name: </Text>
            <Text>
              {}
              {"\n"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>Issued date: </Text>
            <Text>
              {issuedDate}
              {"\n"}
            </Text>
            {/* <Text style={{fontWeight: "bold"}}>Document Name:    </Text><Text>{documentName}{'\n'}</Text> */}
        {/* </Text>
        )} */}
      </View>
      {!loading && (
        <View>
          {!isEditable ? (
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                setIsEditable(!isEditable);
              }}
            >
              <Text style={styles.buttonTextStyle}>Edit</Text>
            </TouchableOpacity>
          ) : null}

          {isEditable ? (
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                editDocument();
              }}
            >
              <Text style={styles.buttonTextStyle}>Save</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              deleteDocument();
            }}
          >
            <Text style={styles.buttonTextStyle}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              getURL();
            }}
          >
            <Text style={styles.buttonTextStyle}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {
              shareURL();
            }}
          >
            <Text style={styles.buttonTextStyle}>Share</Text>
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
    alignContent: "center",
    padding: 20
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
    marginTop: 15
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16
  },
  textStyle: {
    // backgroundColor: "#fff",
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: "left",
    fontWeight: "bold",
    color: "black"
  },
  input: {
    borderColor: "gray",
    // width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // marginTop: 16,
    marginLeft: 35,
    marginRight: 35
    // marginBottom: 30,
  },
  input1: {
    borderColor: "gray",
    // width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    color: "gray"
    // marginBottom: 30,
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  horizontalStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 11
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: '#F4F7F5',
    justifyContent: "center",
    alignItems: "center"
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
    width: "100%"
  }
});
// AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
