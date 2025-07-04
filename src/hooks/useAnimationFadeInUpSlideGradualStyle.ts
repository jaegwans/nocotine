import { View, Text } from 'react-native';
import React from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const useAnimationFadeInUpSlideGradualStyle = (delay: number = 0) => {
    const opacity = useSharedValue(0);
    const bottom = useSharedValue(100);
    React.useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration: 700 }));
        bottom.value = withDelay(delay, withTiming(0, { duration: 700 }));
        return () => {
            opacity.value = 0;
            bottom.value = 100;
        };
    }, []);
    return {
        animatedStyle: useAnimatedStyle(() => ({
            opacity: opacity.value,
            transform: [{ translateY: bottom.value }],
        })),
    };
};

export default useAnimationFadeInUpSlideGradualStyle;
