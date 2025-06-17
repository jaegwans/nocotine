import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function getNonSmokingDuration(quitStartDate: Date, now: Date): number {
  const duration = now.getTime() - quitStartDate.getTime();
  const seconds = Math.floor(duration / 1000);
  return seconds;
}

export function getSmokingDuration(
  smokeStartDate: Date,
  endDate: Date
): number {
  const duration = endDate.getTime() - smokeStartDate.getTime();
  const seconds = Math.floor(duration / 1000);

  return seconds;
}

export function formatSecondsToDuration(seconds: number): string {
  const d = dayjs.duration(seconds, "seconds");

  const days = String(d.days()).padStart(1, "0");
  const hours = String(d.hours()).padStart(1, "0");
  const minutes = String(d.minutes()).padStart(1, "0");
  const secs = String(d.seconds()).padStart(1, "0");

  return `${days}일 ${hours}시간 ${minutes}분 ${secs}초`;
}

export function getStopSmokingProgressRatio(
  stopSmokingDurationSeconds: number,
  smokingDurationSeconds: number
) {
  if (smokingDurationSeconds === 0) return 0;

  return stopSmokingDurationSeconds / smokingDurationSeconds;
}

export function getSmokePerSeconds(averagePerDay: number): number {
  if (averagePerDay <= 0) return 0;
  return averagePerDay / 86400; // 초당 흡연량
}
