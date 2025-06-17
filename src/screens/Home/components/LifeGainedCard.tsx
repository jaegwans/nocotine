import { useMyInfoStore } from "@/store/useMyInfoStore";
import {
  formatSecondsToDuration,
  getNonSmokingDuration,
  getSmokePerSeconds,
} from "@/utils/smokeDateUtils";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./LifeGainedCard.styles";

const LifeGainedCard = () => {
  const [now, setNow] = React.useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const averagePerDay = useMyInfoStore((state) => state.averagePerDay);
  const smokeEndDateAndTime = useMyInfoStore((state) => state.quitDateAndTime);

  const stopSmokingDurationSeconds = smokeEndDateAndTime
    ? getNonSmokingDuration(smokeEndDateAndTime, now)
    : 0;

  const lifeGainedSeconds =
    getSmokePerSeconds(Number(averagePerDay)) *
    stopSmokingDurationSeconds *
    60 *
    20;

  const lifeGained = formatSecondsToDuration(lifeGainedSeconds);

  return (
    <View style={styles.card}>
      <Text style={styles.headerText}>금연으로 늘어난 수명</Text>
      <Text style={styles.contentText}>{lifeGained}</Text>
    </View>
  );
};

export default LifeGainedCard;
