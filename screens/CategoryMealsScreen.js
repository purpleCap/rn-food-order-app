import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { View, Text, StyleSheet } from "react-native";

const CategoryMealScreen = (props) => {
  // console.log(props.route);
  const catId = props.route.params.categoryId;
  const avialableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = avialableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.noMealTextContainer}>
        <Text style={styles.noMealText}>
          We don't have appropriet meals for you, else kindly check your
          filters!
        </Text>
      </View>
    );
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  noMealTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMealText: {
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
  },
});

export default CategoryMealScreen;
