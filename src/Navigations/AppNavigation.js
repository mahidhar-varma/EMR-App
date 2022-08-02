import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UploadScreen from "../Screens/UploadDocument/UploadDocument";
import DrawerContainer from "../Screens/DrawerContainer/DrawerContainer";
import CategoriesScreen from "../Screens/Categories/CategoriesScreen";
import DocumentsListScreen from "../Screens/DocumentsList/DocumentsListScreen";
import DocumentScreen from "../Screens/DocumentScreen/DocumentScreen";
import ApprovalScreen from "../Screens/ApprovalScreen/ApprovalScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import DocumentsListSortedScreen from "../Screens/DocumentListSortedScreen/DocumentListSortedScreen";

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          alignSelf: "center",
          flex: 1,
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UploadScreen" component={UploadScreen} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="DocumentsListScreen"
        component={DocumentsListScreen}
      />
      <Stack.Screen name="DocumentScreen" component={DocumentScreen} />
      <Stack.Screen name="ApprovalScreen" component={ApprovalScreen} />
      <Stack.Screen name="DocumentsListSortedScreen" component={DocumentsListSortedScreen} />

    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

// console.disableYellowBox = true;
