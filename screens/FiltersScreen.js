import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { useDispatch } from "react-redux";
import color from "./../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { setFilters } from "../store/actions/meals";

const FilterComponent = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>{props.filterTitle}</Text>
      <Switch
        trackColor={{ true: color.accentColor }}
        thumbColor={Platform.OS === "android" ? color.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation, route } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    // return appliedFilters;
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters(),
    });
  }, [saveFilters, navigation]);

  navigation.setOptions({
    title: "Filter Meals",
    headerLeft: () => (
      <Ionicons
        name="ios-menu"
        color={"#d2d2d2"}
        size={27}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerRight: () => (
      <Ionicons
        name="ios-save"
        color={"#d2d2d2"}
        size={25}
        onPress={() => saveFilters()}
      />
    ),
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterComponent
        filterTitle="Glutin-free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterComponent
        filterTitle="Lactose-free"
        state={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />

      <FilterComponent
        filterTitle="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />

      <FilterComponent
        filterTitle="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  filterText: {
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});
export default FiltersScreen;
