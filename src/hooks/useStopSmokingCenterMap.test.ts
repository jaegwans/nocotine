import { renderHook, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { useStopSmokingCenterMap } from './useStopSmokingCenterMap';
import { searchNearbyPlaces } from '../apis/searchNearbyPlaces';
import { unifyAdjacentMarkers } from '../utils/unifyAdjacentMarkers';

// Mock dependencies
jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(),
    getCurrentPositionAsync: jest.fn(),
    PermissionStatus: {
        GRANTED: 'granted',
        DENIED: 'denied',
        UNDETERMINED: 'undetermined',
    },
}));
jest.mock('../apis/searchNearbyPlaces');
jest.mock('../utils/unifyAdjacentMarkers');
jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
    Dimensions: {
        get: jest.fn(() => ({ width: 375, height: 812 })),
    },
}));

const mockLocation = Location as jest.Mocked<typeof Location>;
const mockSearchNearbyPlaces = searchNearbyPlaces as jest.MockedFunction<
    typeof searchNearbyPlaces
>;
const mockUnifyAdjacentMarkers = unifyAdjacentMarkers as jest.MockedFunction<
    typeof unifyAdjacentMarkers
>;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe('useStopSmokingCenterMap 훅', () => {
    const mockLocationData = {
        coords: {
            latitude: 37.5665,
            longitude: 126.978,
            altitude: null,
            accuracy: 5,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        },
        timestamp: Date.now(),
    };

    const mockPlaces = [
        {
            id: '1',
            name: '서울시 금연센터',
            latitude: 37.5665,
            longitude: 126.978,
            address: '서울시 중구',
        },
        {
            id: '2',
            name: '중구보건소',
            latitude: 37.5635,
            longitude: 126.9975,
            address: '서울시 중구',
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();

        // Default mocks
        mockLocation.requestForegroundPermissionsAsync.mockResolvedValue({
            status: 'granted' as any,
            granted: true,
            canAskAgain: false,
            expires: 'never',
        });
        mockLocation.getCurrentPositionAsync.mockResolvedValue(
            mockLocationData
        );
        mockSearchNearbyPlaces.mockResolvedValue(mockPlaces);
        mockUnifyAdjacentMarkers.mockReturnValue(mockPlaces);
    });

    it('초기 상태가 올바르게 설정된다', () => {
        const { result } = renderHook(() => useStopSmokingCenterMap());

        expect(result.current.region).toBeNull();
        expect(result.current.places).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.myLocation).toBeNull();
    });

    it('위치 권한이 허용되면 현재 위치를 가져온다', async () => {
        const { result } = renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(result.current.myLocation).toEqual(mockLocationData);
        });

        expect(
            mockLocation.requestForegroundPermissionsAsync
        ).toHaveBeenCalled();
        expect(mockLocation.getCurrentPositionAsync).toHaveBeenCalled();
    });

    it('위치 권한이 거부되면 알림을 표시한다', async () => {
        mockLocation.requestForegroundPermissionsAsync.mockResolvedValue({
            status: 'denied' as any,
            granted: false,
            canAskAgain: true,
            expires: 'never',
        });

        renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith(
                '위치 권한이 필요합니다! 설정에서 허용해주세요.'
            );
        });
    });

    it('위치 정보를 성공적으로 가져오면 region이 설정된다', async () => {
        const { result } = renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(result.current.region).toEqual({
                latitude: 37.5665,
                longitude: 126.978,
                latitudeDelta: expect.any(Number),
                longitudeDelta: expect.any(Number),
            });
        });
    });

    it('근처 장소를 성공적으로 검색한다', async () => {
        const { result } = renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(result.current.places).toEqual(mockPlaces);
        });

        expect(mockSearchNearbyPlaces).toHaveBeenCalledTimes(2); // '보건소', '금연' 키워드로 2번 호출
        expect(mockSearchNearbyPlaces).toHaveBeenCalledWith(
            37.5665,
            126.978,
            '보건소',
            5000
        );
        expect(mockSearchNearbyPlaces).toHaveBeenCalledWith(
            37.5665,
            126.978,
            '금연',
            5000
        );
    });

    it('인접한 마커들이 통합된다', async () => {
        const { result } = renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(result.current.places).toEqual(mockPlaces);
        });

        expect(mockUnifyAdjacentMarkers).toHaveBeenCalledWith(
            [...mockPlaces, ...mockPlaces], // 2개 키워드의 결과가 합쳐짐
            100
        );
    });

    it('API 에러 발생 시 에러 상태가 설정된다', async () => {
        mockSearchNearbyPlaces.mockRejectedValue(new Error('API 에러'));

        const { result } = renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(result.current.error).toBe(
                '주변 장소를 불러오지 못했습니다.'
            );
        });

        expect(console.error).toHaveBeenCalledWith(
            'API 에러:',
            expect.any(Error)
        );
    });

    it('위치 정보를 가져오지 못하면 에러 상태가 설정된다', async () => {
        mockLocation.getCurrentPositionAsync.mockResolvedValue(null as any);

        const { result } = renderHook(() => useStopSmokingCenterMap());

        await waitFor(() => {
            expect(result.current.error).toBe(
                '위치 정보를 가져오지 못했습니다.'
            );
        });
    });

    it('로딩 상태가 올바르게 관리된다', async () => {
        // 느린 비동기 작업을 시뮬레이션하기 위해 지연 추가
        mockLocation.getCurrentPositionAsync.mockImplementation(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve(mockLocationData), 100)
                )
        );

        const { result } = renderHook(() => useStopSmokingCenterMap());

        // 초기 상태는 loading이 false
        expect(result.current.loading).toBe(false);

        // 잠시 후 로딩이 시작됨
        await waitFor(() => {
            expect(result.current.loading).toBe(true);
        });

        // 완료되면 로딩이 끝남
        await waitFor(
            () => {
                expect(result.current.loading).toBe(false);
            },
            { timeout: 3000 }
        );
    });

    it('setRegion으로 지역을 변경할 수 있다', async () => {
        const { result } = renderHook(() => useStopSmokingCenterMap());

        const newRegion = {
            latitude: 35.1796,
            longitude: 129.0756,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
        };

        // 초기 로딩 완료 대기
        await waitFor(() => {
            expect(result.current.region).not.toBeNull();
        });

        // setRegion 호출
        result.current.setRegion(newRegion);

        await waitFor(() => {
            expect(result.current.region).toEqual(newRegion);
        });
    });
});
