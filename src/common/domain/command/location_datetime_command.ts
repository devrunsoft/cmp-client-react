import { Schedule } from "uikit/src/WeeklyTimePicker";

export type LocationDateTimeCommand = {
  Id?: number;
  DayName: string;
  FromTime: number;
  ToTime: number;
};

export function mapScaduleToCommand(
  scadule: Schedule
): LocationDateTimeCommand {
  return {
    Id: scadule.Id,
    DayName: scadule.day,
    FromTime: scadule.from,
    ToTime: scadule.to,
  };
}
