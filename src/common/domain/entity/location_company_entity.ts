export type LocationCompanyEntity = {
  Id: number;
  CompanyId: number;
  OperationalAddressId: number;
  Name: string;
  Lat: number;
  Long: number;
  Capacity: number;
  Comment: string;
  PrimaryFirstName: string | null;
  PrimaryLastName: string | null;
  PrimaryPhonNumber: string | null;
  Type: number;
  CapacityId: number;
  Address: string;
};
