export function combineDateTime(
  date: Date | null,
  time: Date | null
): Date | null {
  if (!date || !time) return null;
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
}
