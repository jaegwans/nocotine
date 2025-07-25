import { useMyInfoStore } from '@/store/useMyInfoStore';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.styles';
import CigarettesAvoidedCard from './components/CigarettesAvoidedCard';
import HealthStatusCard from './components/HealthStatusCard';
import LifeGainedCard from './components/LifeGainedCard';
import MoneySavedCard from './components/MoneySavedCard';
import SmokeFreeDurationCard from './components/SmokeFreeDurationCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigation/types';
import Animated from 'react-native-reanimated';
import useAnimationFadeInUpSlideGradualStyle from '@/hooks/useAnimationFadeInUpSlideGradualStyle';

const HomeScreen = () => {
    const { getSmokeStartDate, getQuitDate } = useMyInfoStore((state) => state);
    const smokeStartDateAndTime = getSmokeStartDate();
    const quitDateAndTime = getQuitDate();
    const sate = useMyInfoStore((state) => state);
    console.log(sate);
    const navigation =
        useNavigation<StackNavigationProp<SettingStackParamList>>();

    const fadeInText = useAnimationFadeInUpSlideGradualStyle(0);
    const fadeInButton = useAnimationFadeInUpSlideGradualStyle(200);

    if (smokeStartDateAndTime === null || quitDateAndTime === null) {
        return (
            <SafeAreaView style={styles.errorContainer} edges={['top']}>
                <Animated.View style={fadeInText.animatedStyle}>
                    <Text style={styles.errorText}>
                        금연 초기 입력 정보가 없습니다.{'\n'}
                        입력 페이지에서 초기 정보를 입력해주세요.
                    </Text>
                </Animated.View>
                <Animated.View style={fadeInButton.animatedStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MyInfo');
                        }}
                    >
                        <Text style={{ color: 'blue', fontSize: 18 }}>
                            초기 정보 입력하기
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <HealthStatusCard />
                <SmokeFreeDurationCard
                    smokeStartDateAndTime={smokeStartDateAndTime}
                    smokeEndDateAndTime={quitDateAndTime}
                />
                <MoneySavedCard
                    smokeStartDateAndTime={smokeStartDateAndTime}
                    smokeEndDateAndTime={quitDateAndTime}
                />
                <LifeGainedCard />
                <CigarettesAvoidedCard />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
