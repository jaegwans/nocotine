import { healthStatusDatas } from "@/constants/healthStatusDatas";
import { useStopSmokingDuration } from "@/hooks/useStopSmokingDuration";

export const useHealthStatus = () => {
  const { stopSmokingDurationSeconds } = useStopSmokingDuration();

  const greaterThanDurationSecondValues = healthStatusDatas.filter(
    (item) => item.goalTimeSecValue >= stopSmokingDurationSeconds
  );

  const nowGoal = greaterThanDurationSecondValues[0];

  const healthStatusReachRate = Math.min(
    stopSmokingDurationSeconds / nowGoal.goalTimeSecValue,
    1
  );

  const healthStatusDescription = nowGoal.description;
  const healthStatusgoalTimeText = nowGoal.goalTime;

  return {
    healthStatusReachRate,
    healthStatusDescription,
    healthStatusgoalTimeText,
  };
};
