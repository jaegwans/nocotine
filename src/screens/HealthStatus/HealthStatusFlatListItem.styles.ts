import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemContainer: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    gap: 12,
  },
  title: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
});
