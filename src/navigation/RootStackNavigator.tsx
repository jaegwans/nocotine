import colors from "@/constants/colors";
import MyInfo from "@/screens/MyInfo/MyInfo";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainBottomTabNavigator from "./MainBottomTabNavigator";

const RootStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "뒤로",
        headerTintColor: colors.black,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="MainBottomTab"
        component={MainBottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          headerTitle: "내 정보",
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
