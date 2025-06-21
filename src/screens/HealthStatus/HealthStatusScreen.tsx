import { healthStatusDatas } from "@/constants/healthStatusDatas";
import { useStopSmokingDuration } from "@/hooks/useStopSmokingDuration";
import React from "react";
import { FlatList, View } from "react-native";
import HealthStatusFlatListItem from "./HealthStatusFlatListItem";
import { styles } from "./HealthStatusScreen.styles";

const HealthStatusScreen = () => {
  const { stopSmokingDurationSeconds } = useStopSmokingDuration(1000);
  return (
    <View style={styles.container}>
      <FlatList
        data={healthStatusDatas}
        renderItem={({ item }) => (
          <HealthStatusFlatListItem
            goalTime={item.goalTime}
            description={item.description}
            goalTimeSecValue={item.goalTimeSecValue}
            stopSmokingDurationSeconds={stopSmokingDurationSeconds}
          />
        )}
        keyExtractor={(item) => item.goalTime}
      />
    </View>
  );
};

export default HealthStatusScreen;
