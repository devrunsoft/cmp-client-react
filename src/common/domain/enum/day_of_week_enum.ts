import { NameAndValue } from "../entity/name_and_value";

export enum DayOfWeekEnum {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// Optional: Mapping for descriptions
export const DayOfWeekDescriptions: Record<DayOfWeekEnum, string> = {
  [DayOfWeekEnum.Sunday]: "Sunday",
  [DayOfWeekEnum.Monday]: "Monday",
  [DayOfWeekEnum.Tuesday]: "Tuesday",
  [DayOfWeekEnum.Wednesday]: "Wednesday",
  [DayOfWeekEnum.Thursday]: "Thursday",
  [DayOfWeekEnum.Friday]: "Friday",
  [DayOfWeekEnum.Saturday]: "Saturday",
};

export const DayOfWeekOptions: NameAndValue[] = Object.entries(DayOfWeekEnum)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({
    name: DayOfWeekDescriptions[value as DayOfWeekEnum] || key,
    value: DayOfWeekDescriptions[value as DayOfWeekEnum] || key,
  }));

export function getClientDay(): DayOfWeekEnum {
  const currentDayIndex = new Date().getDay(); // Get the current day (0-6)
  return currentDayIndex as DayOfWeekEnum; // Cast to enum
}
