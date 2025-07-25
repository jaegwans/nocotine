import { useMyInfoStore } from '@/store/useMyInfoStore';
import { getNonSmokingDuration } from '@/utils/smokeDateUtils';
import React from 'react';

export const useStopSmokingDuration = (intervalMs: number = 1000) => {
    const [now, setNow] = React.useState(new Date());
    React.useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(timer);
    }, [intervalMs]);
    const { getQuitDate } = useMyInfoStore((state) => state);
    const smokeEndDateAndTime = getQuitDate();
    const stopSmokingDurationSeconds = smokeEndDateAndTime
        ? getNonSmokingDuration(smokeEndDateAndTime, now)
        : 0;

    return { stopSmokingDurationSeconds, now };
};
