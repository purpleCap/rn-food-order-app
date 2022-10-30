import React from "react";
import { Platform, Button } from "react-native";
// import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/color";

const CustomHeaderButton = (props) => {
  return (
    <Button
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "#fff" : colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
