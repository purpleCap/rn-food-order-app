import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import color from "./../constants/color";
import FiltersScreen from "../screens/FiltersScreen";
import { MEALS, CATEGORIES } from "./../data/dummy-data";
import { ColorSpace } from "react-native-reanimated";
import { Colors } from "react-native-paper";
import React, { useEffect } from "react";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? color.primaryColor : "#fff",
  },
  headerTintColor: Platform.OS === "android" ? "#d2d2d2" : color.primaryColor,
  headerTitleAlign: "center",
};

const Stack = createNativeStackNavigator();

const MealsNavigator = (x) => {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Categories",
          headerLeft: () => (
            <Ionicons
              name="ios-menu"
              color={"#d2d2d2"}
              size={27}
              onPress={() => x.navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => {
          const catId = route.params.categoryId;
          const selectedCat = CATEGORIES.find((cat) => cat.id === catId);
          return { title: selectedCat.title };
        }}
      />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
  );
};

const Fav = createNativeStackNavigator();
const FavNavigator = () => {
  return (
    <Fav.Navigator screenOptions={defaultStackNavOptions}>
      <Fav.Screen name="Favorites" component={FavoritesScreen} />
      <Fav.Screen name="MealDetail" component={MealDetailScreen} />
    </Fav.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const MealsFavTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Meals"
      activeColor="#f0edf6"
      inactiveColor={color.accentColor}
      barStyle={{ backgroundColor: color.primaryColor }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-restaurant" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites!"
        component={FavNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-star" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Filter = createNativeStackNavigator();
const FilterNavigator = ({ navigation, route }) => {
  return (
    <Filter.Navigator screenOptions={defaultStackNavOptions}>
      <Filter.Screen name="Filters" component={FiltersScreen} />
    </Filter.Navigator>
  );
};

const MyTheme = {
  dark: true,
  colors: {
    primary: color.primaryColor,
    background: color.backgroundColor,
    card: "rgb(183,200,181)",
    text: color.textColor,
    border: "rgb(199, 199, 204)",
    notification: color.accentColor,
  },
};
const Drawer = createDrawerNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        initialRouteName="MealsFavs"
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
        }}
      >
        <Drawer.Screen
          name="MealsFavs"
          component={MealsFavTabNavigator}
          options={{ title: "All Meals" }}
        />
        <Drawer.Screen name="Filter" component={FilterNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
