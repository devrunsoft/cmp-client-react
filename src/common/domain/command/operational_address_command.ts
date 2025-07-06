import { LocationDateTimeCommand } from "./location_datetime_command";

export class OperationalAddressCommand {
  Name: string;
  Address: string;
  CrossStreet: string;
  County: string;
  LocationPhone: string;
  BusinessId: number;
  FirstName: string;
  LastName: string;
  Lat: number;
  Long: number;
  LocationDateTimeInputs: LocationDateTimeCommand[];
  constructor(
    Name: string,
    Address: string,
    CrossStreet: string,
    County: string,
    LocationPhone: string,
    BusinessId: number,
    FirstName: string,
    LastName: string,
    Lat: number,
    Long: number,
    LocationDateTimeInputs: LocationDateTimeCommand[]
  ) {
    this.Name = Name;
    this.Address = Address;
    this.CrossStreet = CrossStreet;
    this.County = County;
    this.LocationPhone = LocationPhone;
    this.BusinessId = BusinessId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Lat = Lat;
    this.Long = Long;
    this.LocationDateTimeInputs = LocationDateTimeInputs;
  }
}
