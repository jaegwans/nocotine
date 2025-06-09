import RootStackNavigator from "@/navigation/RootStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
