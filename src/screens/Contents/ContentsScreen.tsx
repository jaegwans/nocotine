import { View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import React from 'react';
import { styles } from './ContentsScreen.styles';
import stopSmokingCenterIcon from '@/assets/images/stop-smoking-center-icon.png';
import ministryOfHealthIcon from '@/assets/images/ministry-of-health-icon.png';
import stopSmokingEducationIcon from '@/assets/images/stop-smoking-education-icon.png';
import stopSmokingHelpBookIcon from '@/assets/images/stop-smoking-help-book-icon2.png';

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
    return (
        <View style={styles.container}>
            <View style={styles.cardsWrapper}>
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => openUrl('https://nosmk.khepi.or.kr/nsk/ntcc/index.do?utm_source=chatgpt.com')}
                >
                    <Text style={styles.cardTitleText}>금연 두드림</Text>
                    <Image
                        source={stopSmokingCenterIcon}
                        style={styles.cardImageContainer}
                        resizeMode={'contain'}
                        accessibilityLabel="Stop Smoking Center Icon"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardContainer}
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
            </View>
            <View style={styles.cardsWrapper}>
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => openUrl('https://www.nosmokeguide.go.kr/lay2/bbs/S1T33C111/H/24/view.do?article_seq=835839&knowledge=Y&utm_source=chatgpt.com')}
                >
                    <Text style={styles.cardTitleText}>금연 길라잡이</Text>
                    <Image
                        source={stopSmokingEducationIcon}
                        style={styles.cardImageContainer}
                        resizeMode={'contain'}
                        accessibilityLabel="Stop Smoking Education Icon"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => openUrl('https://lms.khepi.or.kr/portal/home/mainAction.do?start=Y')}
                >
                    <Text style={styles.cardTitleText}>금연교육센터</Text>
                    <Image
                        source={stopSmokingHelpBookIcon}
                        style={styles.cardImageContainer}
                        resizeMode={'contain'}
                        accessibilityLabel="Stop Smoking Help Book Icon"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ContentsScreen;
