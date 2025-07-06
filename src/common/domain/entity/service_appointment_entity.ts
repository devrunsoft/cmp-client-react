import { ServiceStatusEnum } from "../enum/service_status_enum";
import { TerminateStatusEnum } from "../enum/terminate_status";
import { LocationCompanyEntity } from "./location_company_entity";
import { ServiceEntity } from "./service_entity";
import { ServicePriceEntity } from "./service_price_entity";

export type ServiceAppointmentEntity = {
  Id: number;
  CompanyId: number;
  OperationalAddressId: number;
  LocationCompanyId: number;
  ServiceTypeId: number;
  // ServicePriceId: string;
  ProductPriceId: number;
  ProductId: number;
  StartDate: string;
  FrequencyType: string;
  IsEmegency: string;
  Qty: number;
  Status: ServiceStatusEnum;
  DayOfWeek: string;
  FromHour: number;
  ToHour: number;
};

export type ClientServiceAppointment = {
  Draft: ServiceAppointmentEntity | null;
  Current: ServiceAppointmentEntity | null;
  Next: ServiceAppointmentEntity | null;
  TerminateStatus: TerminateStatusEnum;
  ServiceId: number;
  InvoiceNumber: string;
};

export type BaseServiceAppointmentEntity = {
  Id?: number;
  ServiceTypeId?: number;
  ServicePriceCrmId?: string;
  ServiceCrmId?: string;
  ProductPriceId?: number;
  ProductId?: number;
  ProviderId?: number;
  CompanyId?: number;
  Status?: string;
  Subsidy?: number;
  OperationalAddressId?: number;
  Qty?: number;
  StartDate?: Date;
  IsEmegency?: boolean;
  Product?: ServiceEntity;
  ProductPrice?: ServicePriceEntity;
  ServiceAppointmentLocations?: LocationCompanyEntity[];
  DayOfWeek: string;
  FromHour: number;
  ToHour: number;
  Amount: number;
};
