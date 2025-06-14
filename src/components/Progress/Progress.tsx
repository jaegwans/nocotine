import React from "react";
import { View } from "react-native";
import { styles } from "./Progress.styles";
interface ProgressProps {
  value: number;
}
const Progress = ({ value }: ProgressProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${value * 100}%` }]} />
    </View>
  );
};

export default Progress;
