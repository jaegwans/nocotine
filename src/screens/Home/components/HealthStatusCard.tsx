import Progress from "@/components/Progress/Progress";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./HealthStatusCard.styles";
// 건강상태 카드 컴포넌트
const HealthStatusCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.headerText}>현재 건강 상태</Text>
      <Text style={styles.contentText}>{"15%"}</Text>
      <Text>소비한 금액</Text>
      <View style={styles.progressContainer}>
        <Progress value={0.3} />
      </View>
      <View style={styles.sideInfomationContainer}>
        <Text>소비한 금액</Text>
        <Text>₩</Text>
      </View>
    </View>
  );
};

export default HealthStatusCard;
