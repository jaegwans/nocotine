import Progress from "@/components/Progress/Progress";
import { useMyInfoStore } from "@/store/useMyInfoStore";
import { getCost } from "@/utils/saveMonnyUtils";
import {
  getNonSmokingDuration,
  getSmokingDuration,
} from "@/utils/smokeDateUtils";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./MoneySavedCard.styles";

interface MoneySavedCardProps {
  smokeStartDateAndTime: Date;
  smokeEndDateAndTime: Date;
}

const MoneySavedCard = ({
  smokeStartDateAndTime,
  smokeEndDateAndTime,
}: MoneySavedCardProps) => {
  // 초당 흡연 비용 =
  // 절약한 금액 = 금연 기간(초) * )

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stopSmokingDurationSeconds = smokeEndDateAndTime
    ? getNonSmokingDuration(smokeEndDateAndTime, now)
    : 0;

  const smokePrice = useMyInfoStore((state) => state.smokePrice);
  const cigaretteCount = useMyInfoStore((state) => state.cigaretteCount);
  const averagePerDay = useMyInfoStore((state) => state.averagePerDay);

  const smokingDurationSeconds = getSmokingDuration(
    smokeStartDateAndTime,
    smokeEndDateAndTime
  );

  const smokingCost = getCost(
    smokingDurationSeconds,
    Number(smokePrice),
    Number(cigaretteCount),
    Number(averagePerDay)
  );

  const savingMoney = getCost(
    stopSmokingDurationSeconds,
    Number(smokePrice),
    Number(cigaretteCount),
    Number(averagePerDay)
  );

  const savingProgressRatio =
    smokingDurationSeconds > 0
      ? stopSmokingDurationSeconds / smokingDurationSeconds
      : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.headerText}>절약한 금액</Text>
      <Text style={styles.contentText}>
        ₩{Number(savingMoney.toFixed(2)).toLocaleString()}
      </Text>
      <View style={styles.progressContainer}>
        <Progress value={savingProgressRatio} />
      </View>
      <View style={styles.sideInfomationContainer}>
        <Text>소비한 금액</Text>
        <Text>₩{Math.floor(smokingCost).toLocaleString()}</Text>
      </View>
    </View>
  );
};

export default MoneySavedCard;
