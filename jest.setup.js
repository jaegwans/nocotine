// React Native 모듈들을 mock 처리
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
}));

jest.mock('react-native-maps', () => ({
  Region: {},
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => 
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 37.5665,
        longitude: 126.9780,
      },
    })
  ),
}));

// API 함수 mock
jest.mock('./src/apis/searchNearbyPlaces', () => ({
  searchNearbyPlaces: jest.fn(() => Promise.resolve([])),
}));
