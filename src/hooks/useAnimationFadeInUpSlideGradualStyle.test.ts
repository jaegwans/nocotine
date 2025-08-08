import { renderHook, act } from '@testing-library/react-native';
import useAnimationFadeInUpSlideGradualStyle from './useAnimationFadeInUpSlideGradualStyle';

// react-native-reanimated 모킹
jest.mock('react-native-reanimated', () => {
    return {
        useSharedValue: jest.fn((initial) => ({ value: initial })),
        useAnimatedStyle: jest.fn((callback) => callback()),
        withDelay: jest.fn((delay, animation) => animation),
        withTiming: jest.fn((toValue, config) => toValue),
    };
});

describe('useAnimationFadeInUpSlideGradualStyle 훅', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('delay 파라미터가 없으면 0이 적용된다', () => {
        const { withDelay } = require('react-native-reanimated');

        renderHook(() => useAnimationFadeInUpSlideGradualStyle());

        expect(withDelay).toHaveBeenCalledWith(0, expect.anything());
    });

    it('delay 파라미터를 전달하면 해당 값이 적용된다', () => {
        const { withDelay } = require('react-native-reanimated');
        const customDelay = 500;

        renderHook(() => useAnimationFadeInUpSlideGradualStyle(customDelay));

        expect(withDelay).toHaveBeenCalledWith(customDelay, expect.anything());
    });

    it('애니메이션 타이밍이 올바르게 설정된다', () => {
        const { withTiming } = require('react-native-reanimated');

        renderHook(() => useAnimationFadeInUpSlideGradualStyle());

        // opacity 애니메이션 (0 → 1)
        expect(withTiming).toHaveBeenCalledWith(1, { duration: 400 });
        // translateY 애니메이션 (100 → 0)
        expect(withTiming).toHaveBeenCalledWith(0, { duration: 400 });
    });
    it('언마운트 시 값이 초기화된다', () => {
        const mockOpacity = { value: 1 };
        const mockBottom = { value: 0 };

        const { useSharedValue } = require('react-native-reanimated');
        useSharedValue
            .mockReturnValueOnce(mockOpacity)
            .mockReturnValueOnce(mockBottom);

        const { unmount } = renderHook(() =>
            useAnimationFadeInUpSlideGradualStyle()
        );

        // 언마운트 실행
        act(() => {
            unmount();
        });

        // 값이 초기화되었는지 확인
        expect(mockOpacity.value).toBe(0);
        expect(mockBottom.value).toBe(100);
    });
});
