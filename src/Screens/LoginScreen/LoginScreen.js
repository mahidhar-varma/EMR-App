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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen(props) {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var [loading, setLoading] = useState(false);
  var userId = "5";
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

  const redirectToSignup = () => {
    // navigation.navigate("SignUpScreen", {});
  };
  const loginUser = (username) => {
    //login logic

    //After Successful Login
    navigation.navigate("ProfilesScreen", {username});
  };

  const storeUsername = async (value) => {
    try {
      await AsyncStorage.setItem('@username', value)
    } catch (e) {
      // saving error
      console.log('error setting username', e);
    }
  }


  return (
    
    <View style={styles.mainBody}>
      {!loading && (
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../../../assets/icons/log2.png")}
          />
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            Login
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
            placeholder="Username"
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {
              value ? setUsername(value) : alert("Username cannot be empty!!");
            }}
          />
        </View>
      )}

{!loading && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            mode="outlined"
            activeUnderlineColor="green"
            onChangeText={(value) => {
              value ? setPassword(value) : alert("Password cannot be empty!!");
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
            onPress={loginUser}
          >
            <Text style={styles.buttonTextStyle}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={redirectToSignup}
          >
            <Text style={styles.buttonTextStyle}>SignUp</Text>
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