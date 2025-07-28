// Mock dependencies
jest.mock('./useStopSmokingDuration', () => ({
  useStopSmokingDuration: jest.fn(() => ({
    stopSmokingDurationSeconds: 3600, // 1시간
  })),
}));

jest.mock('../constants/healthStatusDatas', () => ({
  healthStatusDatas: [
    { goalTimeSecValue: 1200, description: '20분 효과', goalTime: '20분' },
    { goalTimeSecValue: 3600, description: '1시간 효과', goalTime: '1시간' },
    { goalTimeSecValue: 7200, description: '2시간 효과', goalTime: '2시간' },
  ],
}));

import { useHealthStatus } from './useHealthStatus';
import { useStopSmokingDuration } from './useStopSmokingDuration';

describe('useHealthStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('simple test', () => {
    expect(1 + 1).toBe(2);
  });
  
  test('hook function exists', () => {
    expect(typeof useHealthStatus).toBe('function');
  });
  
  test('기본 동작 테스트', () => {
    const result = useHealthStatus();
    
    expect(result.healthStatusReachRate).toBe(1); // 3600 / 3600 = 1
    expect(result.healthStatusDescription).toBe('1시간 효과');
    expect(result.healthStatusgoalTimeText).toBe('1시간');
  });
  
  test('목표 시간보다 적을 때 비율 계산', () => {
    (useStopSmokingDuration as jest.Mock).mockReturnValue({
      stopSmokingDurationSeconds: 1800, // 30분
    });
    
    const result = useHealthStatus();
    
    expect(result.healthStatusReachRate).toBe(0.5); // 1800 / 3600 = 0.5
    expect(result.healthStatusDescription).toBe('1시간 효과');
  });
});
