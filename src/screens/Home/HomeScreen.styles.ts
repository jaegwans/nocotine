import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLighter,
  },
  scrollContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.grayLighter,
  },
});
