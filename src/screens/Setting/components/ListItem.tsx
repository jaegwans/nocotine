import colors from "@/constants/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./ListItem.styles";

interface ListItemProps {
  label: string;
  onPress: () => void;
  isFirst?: boolean;
}

function ListItem({ label, onPress, isFirst }: ListItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        isFirst && { borderTopWidth: 1, borderTopColor: colors.gray },
      ]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default ListItem;
