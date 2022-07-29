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
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
// import DropdownComponent from "./Dropdown";
// import Dropdown from "react-dropdown";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import configData from "../../../config";

const dropdownData = [
  { label: "Diagnostic Report", value: "Diagnostic_Report" },
  { label: "Prescription", value: "Prescription" },
  { label: "Discharge Summary", value: "Discharge_Summary" },
  { label: "Immunization Report", value: "Immunization_Report" },
  { label: "Other", value: "Other" },
];

const data = [
  { label: "Diagnostic Report", value: "Diagnostic Report" },
  { label: "Prescription", value: "Prescription" },
  { label: "Discharge Summary", value: "Discharge Summary" },
  { label: "Immunization_Report", value: "Immunization Report" },
  { label: "Other", value: "Other" },
];

export default function ApprovalScreen(props) {
  const { navigation, route } = props;
  var [loading, setLoading] = useState(false);
  console.log("route", route);
  var fileUploaded = route.params["fileUri"];
  var documentName = route.params["name"];
  var dialog = route.params["dialog"];
  var [doctorName, setDoctorName] = useState("");
  var [hospitalName, setHospitalName] = useState("");
  var issueDate = "2020-11-18";

  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState("date");
  const [isDisplayDate, setShow] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // const [dialog, setDialog] = useState(true);
  var category = route.params["category"];
  console.log("params", fileUploaded, category, documentName);
  const [inputCategory, setInputCategory] = useState(category);
  var userId = route.params["userId"];
  console.log(
    "params0...",
    "&&  ",
    fileUploaded,
    "&&  ",
    documentName,
    "&&  ",
    userId,
    "&&  ",
    inputCategory,
    "&&  ",
    issueDate,
    "&&  ",
    doctorName,
    "&&  ",
    hospitalName
  );
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    issueDate = currentDate;
    setShow(false);
  };

  const m = moment(mydate, "YYYY-MM-DD").format().toString();
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
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Categories
        </Text>
      );
    }
    return null;
  };

  const showSuccessAlert = (fileUri, name, userId, category) => {
    Alert.alert(
      "Upload Successful",
      "",
      [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate("UploadScreen", {});
          },
          style: "cancel",
        },
        {
          text: "Close",
          onPress: () => {
            navigation.navigate("UploadScreen", {});
          },
        },
      ],
      { cancelable: false }
    );
  };
  const datepicker = () => {
    {
      isDisplayDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mydate}
          mode={displaymode}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
        />
      );
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
      issueDate = moment(mydate, "YYYY-MM-DD")
        .format()
        .toString()
        .split("T", [1])
        .toString();

      formData.append("file", { uri: fileUri, name: filename, type });
      formData.append("documentName", documentName);
      formData.append("userId", userId);
      formData.append("category", inputCategory);
      formData.append("issuedDate", issueDate);
      formData.append("doctorName", doctorName);
      formData.append("hospitalName", hospitalName);
      formData.append("source", "user");
      console.log(
        "params...",
        "&&  ",
        fileUri,
        "&&  ",
        documentName,
        "&&  ",
        userId,
        "&&  ",
        inputCategory,
        "&&  ",
        issueDate,
        "&&  ",
        doctorName,
        "&&  ",
        hospitalName
      );

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
          //alert("Upload Successful");
          // navigation.navigate("UploadScreen", {});
          showSuccessAlert();
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
      {loading ? (
        <View style={[styles.containerStyle, styles.horizontalStyle]}>
          <ActivityIndicator animating={true} size="large" color="blue" />
        </View>
      ) : null}
      {!loading ? (
        dialog ? (
          <View>
            {/* <DropdownComponent
              onChange={(item) => {
                setInputCategory(item.value);
                setIsFocus(false);
              }}
            /> */}
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Category" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setInputCategory(item.value);
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
        ) : null
      ) : null}

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

      {!loading ? (
        <TextInput
          style={styles.input}
          placeholder="Enter Hospital/Lab Name"
          mode="outlined"
          activeUnderlineColor="green"
          onChangeText={(value) => {
            value
              ? setHospitalName(value)
              : alert("Hospital/Lab name cannot be empty!!");
          }}
        />
      ) : null}
      {!loading ? (
        <TextInput
          style={styles.input}
          placeholder="Enter Doctor Name"
          mode="outlined"
          activeUnderlineColor="green"
          onChangeText={(value) => {
            value
              ? setDoctorName(value)
              : alert("Doctor name cannot be empty!!");
          }}
        />
      ) : null}
      {!loading ? (
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

      {isDisplayDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mydate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
        />
      )}
      {!loading ? (
        <Text style={styles.input} mode="outlined" activeUnderlineColor="green">
          {m.split("T", [1]).toString()}
        </Text>
      ) : null}

      {!loading ? (
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={uploadDocument}
        >
          <Text style={styles.buttonTextStyle}>Upload Document</Text>
        </TouchableOpacity>
      ) : null}
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
