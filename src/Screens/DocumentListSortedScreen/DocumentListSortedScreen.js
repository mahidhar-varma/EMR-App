import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image , TouchableOpacity, Button} from "react-native";
import styles from "./styles";
import axios from "axios";
import configData from "../../../config";
import * as ReactBootStrap from "react-bootstrap";
import { ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign"
const dropdownData = [
    { label: "Issued Date", value: "issuedDate" },
    { label: "Document Name", value: "documentName" },
    { label: "Doctor Name", value: "doctorName" },
    { label: "Hospital Name", value: "hospitalName" },
    { label: "Source", value: "source" },
  ];


export default function DocumentsListSortedScreen(props) {
  const { navigation, route } = props;
  const [documentsList, setDocumentsList] = useState(null);
  var [loading, setLoading] = useState(false);
  var sortColumn1 = route.params["sortColumn"]
  var [buttonText, setButtonText] = useState("ASC");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  var [sortColumn, setSortColumn] = useState(sortColumn1);
  

  var userId = "5";

  

  function doChanges() {
      setButtonText((buttonText === "ASC" ? "DESC" : "ASC"));
      
      getDocuments(sortColumn,buttonText);
  }

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Sort By
        </Text>
      );
    }
    return null;
  };
  const getDocuments = async (sort,order) => {
    try {
      setLoading(true);
      console.log("sort "+sort);
        console.log("sortColumn "+sortColumn);
        console.log("###############################")
      console.log(configData["serverUrl"] + "/documents/sort");
      await fetch(
        configData["serverUrl"] +
          "/documents/sort?userId=" +
          userId +
          "&sortColumn=" +
          sort +
          "&order=" +
          order,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(function (response) {
        //   console.log("response data", response);
          return response.json();
        })
        .catch(function (error) {
          console.log("-------- error0 ------- " + error);
          alert("result:" + error);
        })
        .then(function (result) {
          setDocumentsList(result["data"]);
        //   console.log("returned json", result["data"]);
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

  useLayoutEffect(() => {
    getDocuments("issuedDate","ASC");
    navigation.setOptions({
      title: "Documents",
      headerRight: () => <View />,
    });
  }, []);

  //   const item = route?.params?.category;
  //   const recipesArray = getRecipes(item.id);

  const onPressDocument = (item) => {
    navigation.navigate("DocumentScreen", { item, userId });
    navigation.setOptions({
      title: item.documenid,
      headerRight: () => <View />,
    });
  };
  const textChange = () =>
  {
    console.log("here")
    if (this.state.text === 'ASC')
    {
        this.setState({text:'DESC'})
    }
    else
    {
      this.setState({text:'ASC'})
    }
    
  }
  const handleDropDownChange = (value) => {
    setSortColumn(value);
    setValue(value);
    setIsFocus(false);
  }
  const renderDocuments = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressDocument(item)}
    >
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={require("../../../assets/icons/file-doc.png")}
        />
        <Text style={styles.title}>{item.documentName}</Text>
        {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {/* {console.log("test..",documentsList)} */}
      {!loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"#fff"} />
        </View>
      )}
      {!loading ? (
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
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
              placeholder={!isFocus ? "Sort By" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                handleDropDownChange(item.value);
                getDocuments(item.value,buttonText);
              }}
              
            />
            <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={()=> {doChanges()}}
        >
          <Text style={styles.buttonTextStyle}>{buttonText}</Text>
        </TouchableOpacity>
          </View>
          ) : null}
      {!loading && (
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={documentsList}
            renderItem={renderDocuments}
            keyExtractor={(item) => `${item.documentId}`}
          />
        </View>
      )}
    </View>
  );
}