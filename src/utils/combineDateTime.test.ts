import { combineDateTime } from './combineDateTime';

describe('combineDateTime', () => {
  it('날짜와 시간이 모두 있을 때 올바른 Date를 반환한다', () => {
    const date = new Date(2025, 6, 28); // 2025-07-28
    const time = new Date(0, 0, 0, 14, 30, 15); // 14:30:15
    const result = combineDateTime(date, time);
    expect(result).not.toBeNull();
    expect(result?.getFullYear()).toBe(2025);
    expect(result?.getMonth()).toBe(6);
    expect(result?.getDate()).toBe(28);
    expect(result?.getHours()).toBe(14);
    expect(result?.getMinutes()).toBe(30);
    expect(result?.getSeconds()).toBe(15);
  });

  it('date가 null이면 null 반환', () => {
    const time = new Date(0, 0, 0, 10, 0, 0);
    expect(combineDateTime(null, time)).toBeNull();
  });

  it('time이 null이면 null 반환', () => {
    const date = new Date(2025, 6, 28);
    expect(combineDateTime(date, null)).toBeNull();
  });

  it('둘 다 null이면 null 반환', () => {
    expect(combineDateTime(null, null)).toBeNull();
  });
});
