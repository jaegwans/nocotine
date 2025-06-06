import ContentsScreen from "@/screens/Contents/ContentsScreen";
import HomeScreen from "@/screens/Home/HomeScreen";
import MapScreen from "@/screens/Map/MapScreen";
import SettingScreen from "@/screens/Setting/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

function RootNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Contents" component={ContentsScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default RootNavigator;
