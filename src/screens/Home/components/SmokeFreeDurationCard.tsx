import Progress from "@/components/Progress/Progress";
import {
  formatSecondsToDuration,
  getNonSmokingDuration,
  getSmokingDuration,
  getStopSmokingProgressRatio,
} from "@/utils/smokeDateUtils";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./SmokeFreeDurationCard.styles";
interface SmokeFreeDurationCardProps {
  smokeStartDateAndTime: Date;
  smokeEndDateAndTime: Date;
}

const SmokeFreeDurationCard = ({
  smokeStartDateAndTime,
  smokeEndDateAndTime,
}: SmokeFreeDurationCardProps) => {
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

  const stopSmokingDurationString = formatSecondsToDuration(
    stopSmokingDurationSeconds
  );

  const smokingDurationSeconds = getSmokingDuration(
    smokeStartDateAndTime,
    smokeEndDateAndTime
  );

  const smokingDurationString = formatSecondsToDuration(smokingDurationSeconds);

  const stopSmokingProgressRatio = getStopSmokingProgressRatio(
    stopSmokingDurationSeconds,
    smokingDurationSeconds
  );

  return (
    <View style={styles.card}>
      <Text style={styles.headerText}>금연 시간</Text>
      <Text style={styles.contentText}>{stopSmokingDurationString}</Text>
      <View style={styles.progressContainer}>
        <Progress value={stopSmokingProgressRatio} />
      </View>
      <View style={styles.sideInfomationContainer}>
        <Text>흡연 기간</Text>
        <Text>{smokingDurationString}</Text>
      </View>
    </View>
  );
};

export default SmokeFreeDurationCard;
