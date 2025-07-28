import {
  calculateDistance,
  getKeywordPriority,
  unifyAdjacentMarkers,
} from './unifyAdjacentMarkers';

describe('unifyAdjacentMarkers', () => {
  it('calculateDistance: 두 좌표 간 거리를 미터 단위로 반환', () => {
    const dist = calculateDistance(37.5665, 126.9780, 37.5665, 126.9780);
    expect(dist).toBeCloseTo(0);
    const dist2 = calculateDistance(37.5665, 126.9780, 37.5651, 126.9895);
    expect(dist2).toBeGreaterThan(0);
  });

  it('getKeywordPriority: "금연" > "보건소" > 기타', () => {
    expect(getKeywordPriority('금연상담실')).toBe(1);
    expect(getKeywordPriority('서울보건소')).toBe(2);
    expect(getKeywordPriority('편의점')).toBe(3);
  });

  it('unifyAdjacentMarkers: 가까운 마커 통합, 우선순위 높은 것 남김', () => {
    const places = [
      { name: '금연상담실', latitude: 37.5665, longitude: 126.9780 },
      { name: '서울보건소', latitude: 37.56651, longitude: 126.97801 }, // 1m 이내
      { name: '편의점', latitude: 37.5651, longitude: 126.9895 }, // 멀리 떨어짐
    ];
    const result = unifyAdjacentMarkers(places, 10); // 10m 이내 통합
    // 금연상담실 vs 서울보건소: 금연상담실 남음, 편의점은 따로 남음
    expect(result.length).toBe(2);
    expect(result.some(p => p.name === '금연상담실')).toBe(true);
    expect(result.some(p => p.name === '편의점')).toBe(true);
  });

  it('unifyAdjacentMarkers: threshold보다 멀면 모두 남음', () => {
    const places = [
      { name: 'A', latitude: 0, longitude: 0 },
      { name: 'B', latitude: 0, longitude: 1 },
    ];
    const result = unifyAdjacentMarkers(places, 10); // 10m
    expect(result.length).toBe(2);
  });
});
