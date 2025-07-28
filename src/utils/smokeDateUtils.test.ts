import {
  getNonSmokingDuration,
  getSmokingDuration,
  formatSecondsToDuration,
  getStopSmokingProgressRatio,
  getSmokePerSeconds,
} from './smokeDateUtils';

describe('smokeDateUtils', () => {
  it('getNonSmokingDuration: 금연 시작일과 현재 날짜 차이를 초로 반환', () => {
    const quitStartDate = new Date('2025-07-27T12:00:00');
    const now = new Date('2025-07-28T12:00:00');
    expect(getNonSmokingDuration(quitStartDate, now)).toBe(86400);
  });

  it('getSmokingDuration: 흡연 시작일과 종료일 차이를 초로 반환', () => {
    const smokeStartDate = new Date('2025-07-20T00:00:00');
    const endDate = new Date('2025-07-28T00:00:00');
    expect(getSmokingDuration(smokeStartDate, endDate)).toBe(8 * 86400);
  });

  it('formatSecondsToDuration: 초를 "n일 n시간 n분 n초"로 포맷', () => {
    expect(formatSecondsToDuration(90061)).toBe('1일 1시간 1분 1초');
    expect(formatSecondsToDuration(0)).toBe('0일 0시간 0분 0초');
  });

  it('getStopSmokingProgressRatio: 금연/흡연 기간 비율 반환', () => {
    expect(getStopSmokingProgressRatio(100, 200)).toBe(0.5);
    expect(getStopSmokingProgressRatio(0, 0)).toBe(0);
  });

  it('getSmokePerSeconds: 하루 평균 흡연량을 초당 흡연량으로 변환', () => {
    expect(getSmokePerSeconds(20)).toBeCloseTo(20 / 86400);
    expect(getSmokePerSeconds(0)).toBe(0);
    expect(getSmokePerSeconds(-5)).toBe(0);
  });
});
