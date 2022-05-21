import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function useUTCTodaySE() {
  const start = dayjs.utc(dayjs().startOf("day")).format();
  const end = dayjs.utc(dayjs().endOf("day")).format();
  return [start, end];
}

export function getLocalToday() {
  return dayjs().local();
}

export function getUTCToday() {
  return dayjs.utc();
}
