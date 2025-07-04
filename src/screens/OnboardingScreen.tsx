import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';

const OnboardingScreen = ({ onDone }: { onDone: () => void }) => {
    return (
        <Onboarding
            onDone={onDone}
            onSkip={onDone}
            showSkip={false}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('@/assets/images/stop-smoking-center-icon.png')}
                            style={{ width: 200, height: 200 }}
                        />
                    ),
                    title: '금연 시작을 응원합니다!',
                    subtitle: '앱 주요 기능을 확인해보세요.',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('@/assets/images/no-smoking.png')}
                            style={{ width: 200, height: 200 }}
                        />
                    ),
                    title: '금연센터 지도',
                    subtitle:
                        '내 주변 금연지원센터를 지도에서 확인할 수 있어요.',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('@/assets/images/profile.png')}
                            style={{ width: 200, height: 200 }}
                        />
                    ),
                    title: '나의 금연 현황',
                    subtitle:
                        '금연 기간, 절약 금액, 건강 변화 등 다양한 정보를 제공합니다.',
                },
            ]}
        />
    );
};

export default OnboardingScreen;
