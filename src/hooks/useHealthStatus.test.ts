// 실제 healthStatusDatas를 import
import { healthStatusDatas } from '../constants/healthStatusDatas';
import { useHealthStatus } from './useHealthStatus';
import { useStopSmokingDuration } from './useStopSmokingDuration';

jest.mock('./useStopSmokingDuration');

describe('useHealthStatus', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('20분 미만일 때 첫 번째 단계', () => {
        (useStopSmokingDuration as jest.Mock).mockReturnValue({
            stopSmokingDurationSeconds: 600, // 10분
        });
        const result = useHealthStatus();
        expect(result.healthStatusReachRate).toBeCloseTo(0.5); // 600/1200
        expect(result.healthStatusDescription).toBe(
            healthStatusDatas[0].description
        );
        expect(result.healthStatusgoalTimeText).toBe(
            healthStatusDatas[0].goalTime
        );
    });

    test('정확히 20분일 때 두 번째 단계로 넘어가지 않음', () => {
        (useStopSmokingDuration as jest.Mock).mockReturnValue({
            stopSmokingDurationSeconds: 1200, // 20분
        });
        const result = useHealthStatus();
        expect(result.healthStatusReachRate).toBe(1);
        expect(result.healthStatusDescription).toBe(
            healthStatusDatas[0].description
        );
        expect(result.healthStatusgoalTimeText).toBe(
            healthStatusDatas[0].goalTime
        );
    });

    test('12시간 미만일 때 두 번째 단계', () => {
        (useStopSmokingDuration as jest.Mock).mockReturnValue({
            stopSmokingDurationSeconds: 20000, // 약 5.5시간
        });
        const result = useHealthStatus();
        expect(result.healthStatusReachRate).toBeCloseTo(20000 / 43200);
        expect(result.healthStatusDescription).toBe(
            healthStatusDatas[1].description
        );
        expect(result.healthStatusgoalTimeText).toBe(
            healthStatusDatas[1].goalTime
        );
    });

    test('12주 이상일 때 9달 단계로', () => {
        (useStopSmokingDuration as jest.Mock).mockReturnValue({
            stopSmokingDurationSeconds: 8000000, // 12주 초과
        });
        const result = useHealthStatus();
        expect(result.healthStatusDescription).toBe(
            healthStatusDatas[3].description
        );
        expect(result.healthStatusgoalTimeText).toBe(
            healthStatusDatas[3].goalTime
        );
    });

    test('15년 이상일 때 마지막 단계', () => {
        (useStopSmokingDuration as jest.Mock).mockReturnValue({
            stopSmokingDurationSeconds: 500000000, // 15년 초과
        });
        const result = useHealthStatus();
        expect(result.healthStatusDescription).toBe(
            healthStatusDatas[7].description
        );
        expect(result.healthStatusgoalTimeText).toBe(
            healthStatusDatas[7].goalTime
        );
        // 마지막 단계의 goalTimeSecValue로 나누어 1이 나와야 함
        expect(result.healthStatusReachRate).toBe(1);
    });
});
