import { healthStatusDatas } from '@/constants/healthStatusDatas';
import { useStopSmokingDuration } from '@/hooks/useStopSmokingDuration';

export const useHealthStatus = () => {
    const { stopSmokingDurationSeconds } = useStopSmokingDuration();

    const greaterThanDurationSecondValues = healthStatusDatas.filter(
        (item) => item.goalTimeSecValue >= stopSmokingDurationSeconds
    );

    // 모든 단계를 초과하면 마지막 단계로 fallback
    const nowGoal =
        greaterThanDurationSecondValues.length > 0
            ? greaterThanDurationSecondValues[0]
            : healthStatusDatas[healthStatusDatas.length - 1];

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
