import colors from "@/constants/colors";
import ContentsScreen from "@/screens/Contents/ContentsScreen";
import HomeScreen from "@/screens/Home/HomeScreen";
import MapScreen from "@/screens/Map/MapScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import SettingNavigator from "./SettingNavigator";

function MainBottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Map") {
            iconName = "map";
          } else if (route.name === "Contents") {
            iconName = "play-circle";
          } else if (route.name === "SettingNavigator") {
            iconName = "settings";
          } else {
            iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.black,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerTitle: "금연센터 맵" }}
      />
      <Tab.Screen
        name="Contents"
        component={ContentsScreen}
        options={{
          headerTitle: "금연 정보",
        }}
      />
      <Tab.Screen
        name="SettingNavigator"
        component={SettingNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "setting",
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomTabNavigator;
