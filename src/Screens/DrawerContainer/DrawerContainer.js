import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import UploadScreen from "../UploadDocument/UploadDocument";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="UploadScreen"
          //source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("UploadScreen");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Categories"
          // source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("CategoriesScreen");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Home"
          // source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("HomeScreen");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
