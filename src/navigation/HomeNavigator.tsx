import colors from "@/constants/colors";
import HealthStatusScreen from "@/screens/HealthStatus/HealthStatusScreen";
import HomeScreen from "@/screens/Home/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthStatus"
        component={HealthStatusScreen}
        options={{
          headerBackTitle: "뒤로",
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "건강 상태",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
