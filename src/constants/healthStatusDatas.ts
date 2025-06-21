export interface HealthStatusData {
  goalTime: string;
  description: string;
  goalTimeSecValue: number;
}

export const healthStatusDatas: HealthStatusData[] = [
  {
    goalTime: "20분",
    description: "혈압 감소",
    goalTimeSecValue: 20 * 60, // 20분 = 1200초
  },
  {
    goalTime: "12시간",
    description: "혈액 속의 산소량 증가, 일산화탄소량 감소",
    goalTimeSecValue: 12 * 60 * 60, // 12시간 = 43200초
  },
  {
    goalTime: "12주",
    description: "혈액순환과 폐기능 향상",
    goalTimeSecValue: 12 * 7 * 24 * 60 * 60, // 12주 = 7257600초
  },
  {
    goalTime: "9달",
    description:
      "기침 감소 및 편안한 호흡, 폐의 섬모 기능 회복으로 감염 위험 감소",
    goalTimeSecValue: 9 * 30 * 24 * 60 * 60, // 9달(30일/달 가정) = 23328000초
  },
  {
    goalTime: "1년",
    description: "관상동맥질환(심근경색) 발생위험이 흡연자보다 절반으로 감소",
    goalTimeSecValue: 365 * 24 * 60 * 60, // 1년 = 31536000초
  },
  {
    goalTime: "5년",
    description: "금연 후 5년 이상 지나면 중풍 발생위험이 비흡연자와 동일",
    goalTimeSecValue: 5 * 365 * 24 * 60 * 60, // 5년 = 157680000초
  },
  {
    goalTime: "10년",
    description:
      "폐암 사망률 및 구강암, 후두암, 식도암, 방광암, 신장암, 췌장암의 발생위험 감소",
    goalTimeSecValue: 10 * 365 * 24 * 60 * 60, // 10년 = 315360000초
  },
  {
    goalTime: "15년",
    description: "관상동맥질환 발생위험이 비흡연자와 동일",
    goalTimeSecValue: 15 * 365 * 24 * 60 * 60, // 15년 = 473040000초
  },
];
