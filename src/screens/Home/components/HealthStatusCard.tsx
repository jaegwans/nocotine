import Progress from "@/components/Progress/Progress";
import { HomeStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";

import colors from "@/constants/colors";
import { useHealthStatus } from "@/hooks/useHealthStatus";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./HealthStatusCard.styles";

const HealthStatusCard = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, "HealthStatus">>();
  const {
    healthStatusReachRate,
    healthStatusDescription,
    healthStatusgoalTimeText,
  } = useHealthStatus();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("HealthStatus")}
    >
      <View style={styles.card}>
        <Text style={styles.headerText}>현재 건강 상태</Text>
        <Text style={styles.contentText}>
          {(healthStatusReachRate * 100).toFixed(2)}%
        </Text>
        <Text>{healthStatusDescription}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.goalIconContainer}>
            <Ionicons name="flag-sharp" size={17} color={colors.greenDark} />
          </View>
          <Progress value={healthStatusReachRate} />
        </View>
        <View style={styles.sideInfomationContainer}>
          <Text>{healthStatusgoalTimeText}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HealthStatusCard;
