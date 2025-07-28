import { myInfoValidate } from './myInfoValidate';

describe('myInfoValidate', () => {
  it('모든 값이 정상일 때 에러 없음', () => {
    const result = myInfoValidate({
      smokePrice: '4500',
      smokeStartDate: new Date('2025-07-20'),
      quitDate: new Date('2025-07-28'),
      cigaretteCount: '20',
      averagePerDay: '15',
    });
    expect(result.errorMessage).toBeNull();
    expect(Object.values(result.errorFields).every(v => v === false)).toBe(true);
  });

  it('흡연 시작일/금연 시작일이 null이면 에러', () => {
    const result = myInfoValidate({
      smokePrice: '4500',
      smokeStartDate: null,
      quitDate: null,
      cigaretteCount: '20',
      averagePerDay: '15',
    });
    expect(result.errorMessage).toContain('선택');
    expect(result.errorFields.smokeStartDate).toBe(true);
    expect(result.errorFields.quitDate).toBe(true);
  });

  it('흡연 시작일이 오늘보다 미래면 에러', () => {
    const future = new Date('2025-08-01');
    const result = myInfoValidate({
      smokePrice: '4500',
      smokeStartDate: future,
      quitDate: new Date('2025-07-28'),
      cigaretteCount: '20',
      averagePerDay: '15',
    });
    expect(result.errorMessage).toContain('초과');
    expect(result.errorFields.smokeStartDate).toBe(true);
  });

  it('금연 시작일이 흡연 시작일보다 빠르면 에러', () => {
    const result = myInfoValidate({
      smokePrice: '4500',
      smokeStartDate: new Date('2025-07-28'),
      quitDate: new Date('2025-07-20'),
      cigaretteCount: '20',
      averagePerDay: '15',
    });
    expect(result.errorMessage).toContain('빠를 수 없습니다');
    expect(result.errorFields.smokeStartDate).toBe(true);
    expect(result.errorFields.quitDate).toBe(true);
  });

  it('가격/개비/평균이 자연수가 아니면 에러', () => {
    const result = myInfoValidate({
      smokePrice: 'abc',
      smokeStartDate: new Date('2025-07-20'),
      quitDate: new Date('2025-07-28'),
      cigaretteCount: 'xyz',
      averagePerDay: '1.5',
    });
    expect(result.errorFields.smokePrice).toBe(true);
    expect(result.errorFields.cigaretteCount).toBe(true);
    expect(result.errorFields.averagePerDay).toBe(true);
    expect(result.errorMessage).toContain('자연수');
  });
});
