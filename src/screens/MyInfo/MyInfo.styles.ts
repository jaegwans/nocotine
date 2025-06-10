import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.white,
    gap: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  dateBox: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: colors.grayLightest,
    flex: 3,
  },
  timeBox: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: colors.grayLightest,
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    color: colors.black,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    backgroundColor: colors.greenLight,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButtonText: {
    fontSize: 18,
    paddingBottom: 20,
    color: colors.black,
  },
  dateInputContainer: { flexDirection: "row", gap: 8 },
});
