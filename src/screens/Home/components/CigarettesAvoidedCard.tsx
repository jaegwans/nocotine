import { useMyInfoStore } from '@/store/useMyInfoStore';
import { getNonSmokingDuration } from '@/utils/smokeDateUtils';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './CigarettesAvoidedCard.styles';

const CigarettesAvoidedCard = () => {
    // 금연한 담배 갯수 -> 금연기간 (초) * 하루 흡연량 / 86400
    const [now, setNow] = React.useState(new Date());
    React.useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000 * 60 * 60);
        return () => clearInterval(timer);
    }, []);
    const { getQuitDate } = useMyInfoStore((state) => state);
    const smokeEndDateAndTime = getQuitDate();
    const averagePerDay = useMyInfoStore((state) => state.averagePerDay);
    const stopSmokingDurationSeconds = smokeEndDateAndTime
        ? getNonSmokingDuration(smokeEndDateAndTime, now)
        : 0;

    const cigarettesAvoided = Math.floor(
        (stopSmokingDurationSeconds * Number(averagePerDay)) / 86400
    );

    return (
        <View style={styles.card}>
            <Text style={styles.headerText}>금연한 담배 개수</Text>
            <Text style={styles.contentText}>{cigarettesAvoided}</Text>
        </View>
    );
};

export default CigarettesAvoidedCard;
