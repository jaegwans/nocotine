import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import React from 'react';
import { styles } from './ContentsScreen.styles';
import stopSmokingCenterIcon from '@/assets/images/stop-smoking-center-icon.png';
import ministryOfHealthIcon from '@/assets/images/ministry-of-health-icon.png';
import stopSmokingEducationIcon from '@/assets/images/stop-smoking-education-icon.png';
import stopSmokingHelpBookIcon from '@/assets/images/stop-smoking-help-book-icon2.png';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import useAnimationFadeInUpSlideGradualStyle from '@/hooks/useAnimationFadeInUpSlideGradualStyle';

const openUrl = async (url: string) => {
    try {
        await Linking.openURL(url);
    } catch (e) {
        Alert.alert('링크를 열 수 없습니다.');
    }
};

const openTel = (tel: string) => {
    Linking.openURL(`tel:${tel}`);
};

const ContentsScreen = () => {
    const fadeInStyle1 = useAnimationFadeInUpSlideGradualStyle(0);
    const fadeInStyle2 = useAnimationFadeInUpSlideGradualStyle(200);
    const fadeInStyle3 = useAnimationFadeInUpSlideGradualStyle(400);
    const fadeInStyle4 = useAnimationFadeInUpSlideGradualStyle(600);
    return (
        <View style={styles.container}>
            <View style={styles.cardsWrapper}>
                <Animated.View
                    style={[styles.cardContainer, fadeInStyle1.animatedStyle]}
                >
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() =>
                            openUrl(
                                'https://nosmk.khepi.or.kr/nsk/ntcc/index.do?utm_source=chatgpt.com'
                            )
                        }
                    >
                        <Text style={styles.cardTitleText}>금연 두드림</Text>
                        <Image
                            source={stopSmokingCenterIcon}
                            style={styles.cardImageContainer}
                            resizeMode={'contain'}
                            accessibilityLabel="Stop Smoking Center Icon"
                        />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    style={[styles.cardContainer, fadeInStyle2.animatedStyle]}
                >
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => openTel('15449030')}
                    >
                        <Text style={styles.cardTitleText}>
                            보건복지부 {'\n'}금연상담
                        </Text>
                        <Image
                            source={ministryOfHealthIcon}
                            style={styles.cardImageContainer}
                            resizeMode={'contain'}
                            accessibilityLabel="Ministry of Health Icon"
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <View style={styles.cardsWrapper}>
                <Animated.View
                    style={[styles.cardContainer, fadeInStyle3.animatedStyle]}
                >
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() =>
                            openUrl(
                                'https://www.nosmokeguide.go.kr/lay2/bbs/S1T33C111/H/24/view.do?article_seq=835839&knowledge=Y&utm_source=chatgpt.com'
                            )
                        }
                    >
                        <Text style={styles.cardTitleText}>금연 길라잡이</Text>
                        <Image
                            source={stopSmokingEducationIcon}
                            style={styles.cardImageContainer}
                            resizeMode={'contain'}
                            accessibilityLabel="Stop Smoking Education Icon"
                        />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    style={[styles.cardContainer, fadeInStyle4.animatedStyle]}
                >
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() =>
                            openUrl(
                                'https://lms.khepi.or.kr/portal/home/mainAction.do?start=Y'
                            )
                        }
                    >
                        <Text style={styles.cardTitleText}>금연교육센터</Text>
                        <Image
                            source={stopSmokingHelpBookIcon}
                            style={styles.cardImageContainer}
                            resizeMode={'contain'}
                            accessibilityLabel="Stop Smoking Help Book Icon"
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

export default ContentsScreen;
