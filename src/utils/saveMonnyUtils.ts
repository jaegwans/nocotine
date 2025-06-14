function getPerSecondSpent(
  packPrice: number,
  cigarettesPerPack: number,
  avgPerDay: number
): number {
  const cigarettePrice = packPrice / cigarettesPerPack;
  const dailySpent = avgPerDay * cigarettePrice;
  const perSecondSpent = dailySpent / 86400;
  return perSecondSpent;
}
export function getCost(
  seconds: number,
  packPrice: number,
  cigarettesPerPack: number,
  avgPerDay: number
): number {
  const perSecondSpent = getPerSecondSpent(
    packPrice,
    cigarettesPerPack,
    avgPerDay
  );
  return seconds * perSecondSpent;
}
