export const myInfoValidate = ({
  smokePrice,
  smokeStartDate,
  quitDate,
  cigaretteCount,
  averagePerDay,
}: {
  smokePrice: string;
  smokeStartDate: Date | null;
  quitDate: Date | null;
  cigaretteCount: string;
  averagePerDay: string;
}): {
  errorMessage: string | null;
  errorFields: { [key: string]: boolean };
} => {
  const today = new Date();

  const errorFields: { [key: string]: boolean } = {
    smokeStartDate: false,
    quitDate: false,
    smokePrice: false,
    cigaretteCount: false,
    averagePerDay: false,
  };
  let errorMessage: string | null = null;

  if (!smokeStartDate) {
    errorFields.smokeStartDate = true;
    errorMessage = "흡연 시작일과 금연 시작일을 모두 선택하세요.";
  }
  if (!quitDate) {
    errorFields.quitDate = true;
    if (!errorMessage)
      errorMessage = "흡연 시작일과 금연 시작일을 모두 선택하세요.";
  }
  if (smokeStartDate && smokeStartDate > today) {
    errorFields.smokeStartDate = true;
    if (!errorMessage)
      errorMessage = "흡연 시작일은 오늘을 초과할 수 없습니다.";
  }
  if (quitDate && quitDate > today) {
    errorFields.quitDate = true;
    if (!errorMessage)
      errorMessage = "금연 시작일은 오늘을 초과할 수 없습니다.";
  }
  if (smokeStartDate && quitDate && quitDate < smokeStartDate) {
    errorFields.quitDate = true;
    errorFields.smokeStartDate = true;
    if (!errorMessage)
      errorMessage = "금연 시작일은 흡연 시작일보다 빠를 수 없습니다.";
  }
  if (!/^\d+$/.test(smokePrice)) {
    errorFields.smokePrice = true;
    if (!errorMessage) errorMessage = "담배 한 갑 가격은 자연수로 입력하세요.";
  }
  if (!/^\d+$/.test(cigaretteCount)) {
    errorFields.cigaretteCount = true;
    if (!errorMessage) errorMessage = "한 갑당 개비 수는 자연수로 입력하세요.";
  }
  if (!/^\d+$/.test(averagePerDay)) {
    errorFields.averagePerDay = true;
    if (!errorMessage) errorMessage = "하루 평균 흡연량은 자연수로 입력하세요.";
  }

  return { errorMessage, errorFields };
};
