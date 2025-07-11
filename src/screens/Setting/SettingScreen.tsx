import { RootStackParamList } from '@/navigation/types';
import { useMyInfoStore } from '@/store/useMyInfoStore';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Linking, ScrollView } from 'react-native';
import { styles } from './SettingScreen.styles';
import ListItem from './components/ListItem';
import { useFirstOpenStore } from '@/store/useFirstOpenStore';

const SettingScreen = () => {
    const navigation =
        useNavigation<BottomTabNavigationProp<RootStackParamList, 'MyInfo'>>();
    const resetMyInfo = useMyInfoStore((state) => state.resetMyInfo);
    const setFirstOpen = useFirstOpenStore((state) => state.setFirstOpen);
    return (
        <ScrollView style={styles.container}>
            <ListItem
                label="내 정보"
                onPress={() => {
                    navigation.navigate('MyInfo');
                }}
                isFirst={true}
            />
            <ListItem
                label="기록 데이터 초기화"
                onPress={() => {
                    Alert.alert(
                        '기록 데이터 초기화',
                        '정말로 초기화하시겠습니까?',
                        [
                            { text: '취소', style: 'cancel' },
                            {
                                text: '확인',
                                onPress: () => {
                                    resetMyInfo();
                                    Alert.alert(
                                        '초기화 완료',
                                        '기록 데이터가 초기화되었습니다.'
                                    );
                                },
                            },
                        ]
                    );
                }}
            />
            <ListItem
                label="금연 재시작"
                onPress={() => {
                    Alert.alert(
                        '기록 및 앱 데이터 초기화',
                        '정말로 초기화하시겠습니까?',
                        [
                            { text: '취소', style: 'cancel' },
                            {
                                text: '확인',
                                onPress: () => {
                                    resetMyInfo();
                                    setFirstOpen(true);

                                    Alert.alert(
                                        '초기화 완료',
                                        '기록 데이터가 초기화되었습니다.'
                                    );
                                },
                            },
                        ]
                    );
                }}
            />
            <ListItem
                label="서비스 이용약관"
                onPress={() => {
                    Linking.openURL(
                        'https://jaegwans.notion.site/nocotine-226a05ba824e80b8a9b1de431ed80e42?source=copy_link'
                    );
                }}
            />
            <ListItem
                label="개인정보 처리방침"
                onPress={() => {
                    Linking.openURL(
                        'https://jaegwans.notion.site/nocotine-226a05ba824e8019b014cf3ece4c7170?source=copy_link'
                    );
                }}
            />
        </ScrollView>
    );
};

export default SettingScreen;
