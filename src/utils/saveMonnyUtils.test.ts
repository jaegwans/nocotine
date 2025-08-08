import { getCost } from './saveMonnyUtils';

describe('saveMonnyUtils', () => {
    it('정상 입력 시 절약 금액 계산', () => {
        // 4500원/20개비, 하루 10개비, 86400초(1일) 동안 절약 금액
        const result = getCost(86400, 4500, 20, 10);
        // 하루 절약 금액: (4500/20)*10 = 2250원
        expect(result).toBeCloseTo(2250);
    });

    it('초가 0이면 0 반환', () => {
        expect(getCost(0, 4500, 20, 10)).toBe(0);
    });

    it('음수/0 입력 시 정상 동작', () => {
        expect(getCost(1000, 0, 20, 10)).toBe(0);
        expect(getCost(1000, 4500, 0, 10)).toBe(0); // 0개비로 나누면 0 반환
        expect(getCost(1000, 4500, 20, 0)).toBe(0);
    });
});
