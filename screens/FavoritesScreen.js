import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MealList from "../components/MealList";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

const FavoritesScreen = (props) => {
  const { navigation } = props;
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.onFavTextContainer}>
        <Text style={styles.onFavText}>You don't have any Favorite Meal</Text>
      </View>
    );
  }

  props.navigation.setOptions({
    title: "Your Favorites",
    headerLeft: () => (
      <Ionicons
        name="ios-menu"
        color={"#d2d2d2"}
        size={25}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  });

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  onFavTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  onFavText: {
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
  },
});

export default FavoritesScreen;
