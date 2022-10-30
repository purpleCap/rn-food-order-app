import React from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
import { Ionicons } from "@expo/vector-icons";

const MealDetailScreen = (props) => {
  const mealId = props.route.params.mealId;
  const isCurrentMealFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const avialableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = avialableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(mealId));
  };

  props.navigation.setOptions({
    title: selectedMeal.title,
    headerRight: () => (
      <Ionicons
        name={isCurrentMealFav ? "ios-star" : "ios-star-outline"}
        color={"#fff"}
        size={25}
        onPress={toggleFavoriteHandler}
      />
    ),
  });

  const ListItem = (props) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.textStyle}>{props.children}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.screen}>
        <View style={styles.details}>
          <Text>{selectedMeal.duration}m</Text>
          <Text>{selectedMeal.complexity.toUpperCase()}</Text>
          <Text>{selectedMeal.affordability.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map((ing) => (
          <ListItem key={ing}>{ing}</ListItem>
        ))}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map((step) => (
          <ListItem key={step}>{step}</ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

// MealDetailScreen.navigationOptions = (navigationData) => {
//   const mealId = navigationData.route.params.mealId;
//   const selectedMeal = MEALS.find((meal) => meal.id === mealId);
//   return {
//     headerTitle: selectedMeal.title,
//     headerRight: (
//       <Button
//         onPress={() => alert("This is a button!")}
//         title="Info"
//         color="#fff"
//       />
//     ),
// headerRight: (
//   <HeaderButton HeaderButtonComponent={HeaderButton}>
//     <Item
//       title="Favorite"
//       iconName="ios-star"
//       onPress={() => (
//         <Button
//           onPress={() => alert('This is a button!')}
//           title="Info"
//           color="#fff"
//         />
//       ),}
//     />
//   </HeaderButton>
// ),
//   };
// };

const styles = StyleSheet.create({
  image: { width: "100%", height: 200 },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 5,
    borderColor: "#d2d2d2",
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 20,
    lineHeight: 25,
  },
});
export default MealDetailScreen;
