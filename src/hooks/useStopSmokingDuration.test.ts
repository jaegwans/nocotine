// Mock dependencies
jest.mock('../utils/smokeDateUtils', () => ({
  getNonSmokingDuration: jest.fn(() => 1234),
}));

jest.mock('../store/useMyInfoStore', () => ({
  useMyInfoStore: jest.fn(() => ({
    getQuitDate: jest.fn(() => '2024-07-27T00:00:00.000Z'),
  })),
}));

// Mock React hooks
let mockSetNow = jest.fn();
let mockDate = new Date('2024-07-28T00:00:00.000Z');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => [mockDate, mockSetNow]),
  useEffect: jest.fn((callback) => {
    callback(); // 즉시 실행
    return jest.fn(); // cleanup function
  }),
}));

import { useStopSmokingDuration } from './useStopSmokingDuration';
import { getNonSmokingDuration } from '../utils/smokeDateUtils';
import { useMyInfoStore } from '../store/useMyInfoStore';

describe('useStopSmokingDuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDate = new Date('2024-07-28T00:00:00.000Z');
    mockSetNow = jest.fn();
  });

  test('기본 동작 테스트', () => {
    const result = useStopSmokingDuration();
    
    expect(result.stopSmokingDurationSeconds).toBe(1234);
    expect(result.now).toEqual(mockDate);
  });
  
  test('intervalMs 파라미터가 전달되는지 확인', () => {
    const React = require('react');
    React.useEffect.mockClear();
    
    useStopSmokingDuration(5000);
    
    expect(React.useEffect).toHaveBeenCalledWith(expect.any(Function), [5000]);
  });
  
  test('mock된 함수들이 호출되는지 확인', () => {
    useStopSmokingDuration();
    
    expect(useMyInfoStore).toHaveBeenCalled();
    expect(getNonSmokingDuration).toHaveBeenCalledWith('2024-07-27T00:00:00.000Z', mockDate);
  });
  
  test('getQuitDate가 null일 때 duration이 0이 되는지 확인', () => {
    const mockUseMyInfoStore = useMyInfoStore as unknown as jest.Mock;
    mockUseMyInfoStore.mockReturnValue({
      getQuitDate: jest.fn(() => null),
    });
    
    const result = useStopSmokingDuration();
    
    expect(result.stopSmokingDurationSeconds).toBe(0);
  });
});
