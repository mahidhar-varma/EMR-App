import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 70,
  },
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  image: {
    marginBottom: 40,
    height: 100,
    resizeMode: "contain",
  },
});

export default styles;
