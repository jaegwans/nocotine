import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 18,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    color: colors.text,
  },
  contentText: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "bold",
    marginTop: 8,
  },
  progressContainer: {
    alignSelf: "center",
    width: "100%",
    marginTop: 8,
  },
  sideInfomationContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    marginTop: 8,
  },
});
