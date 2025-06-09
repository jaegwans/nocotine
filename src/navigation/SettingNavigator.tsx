import colors from "@/constants/colors";
import SettingScreen from "@/screens/Setting/SettingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const SettingNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
