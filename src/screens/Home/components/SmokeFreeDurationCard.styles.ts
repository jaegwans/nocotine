import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: 18,

    backgroundColor: colors.white,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    color: colors.text,

    marginLeft: 18,
  },
  contentText: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 18,
  },
  progressContainer: {
    alignSelf: "center",
    width: "90%",
    marginTop: 8,
  },
  sideInfomationContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    marginRight: 18,
    marginTop: 8,
  },
});
