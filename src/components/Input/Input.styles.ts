import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 48,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: "#000",
  },
});
