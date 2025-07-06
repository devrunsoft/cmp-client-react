import { LocationCompanyEntity } from "./location_company_entity";
import { Schedule } from "uikit/src/WeeklyTimePicker";
import { LocationDateTimeEntity } from "./location_datetime_entity";

export type OperationalAddressEntity = {
    Id?: number;
    Name?: string;
    CompanyId?: number;
    Lat?: number;
    Long?: number;
    Address?: string;
    CrossStreet?: string;
    LocationPhone?: string;
    BusinessId?: number;
    County?: string;
    FirstName?: string;
    LastName?: string;
    LocationDateTimes: LocationDateTimeEntity[] | null
    LocationCompany: LocationCompanyEntity[] | null
};


export function mapEntityToScadule(
    entity: LocationDateTimeEntity
  ): Schedule {
    return {
      Id: entity.Id,
      day: entity.DayName,
      from: entity.FromTime,
      to: entity.ToTime,
    };
  }
  