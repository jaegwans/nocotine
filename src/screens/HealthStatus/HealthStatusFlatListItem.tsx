import Progress from "@/components/Progress/Progress";
import { HealthStatusData } from "@/constants/healthStatusDatas";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./HealthStatusFlatListItem.styles";

interface HealthStatusFlatListItemProps extends HealthStatusData {
  stopSmokingDurationSeconds: number;
}
const HealthStatusFlatListItem = ({
  goalTime,
  description,
  goalTimeSecValue,
  stopSmokingDurationSeconds,
}: HealthStatusFlatListItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{goalTime}</Text>
      <Text style={styles.description}>{description}</Text>
      <Progress value={stopSmokingDurationSeconds / goalTimeSecValue} />
    </View>
  );
};

export default HealthStatusFlatListItem;
