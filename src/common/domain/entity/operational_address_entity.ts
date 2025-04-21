import { LocationCompanyEntity } from "./location_company_entity";

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
    LocationCompany: LocationCompanyEntity[] | null
};

