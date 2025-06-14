import colors from "@/constants/colors";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    height: 20,
    width: "100%",
    backgroundColor: colors.grayLightest,
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: 20,
    borderRadius: 5,
    backgroundColor: "#4caf50",
  },
});
