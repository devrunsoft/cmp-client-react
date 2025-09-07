import { ServiceStatus } from "cmp-core/src/Enum/serviceStatus";
import { TerminateStatusEnum } from "../enum/terminate_status";
import { LocationCompanyEntity } from "./location_company_entity";
import { ServiceEntity } from "./service_entity";
import { ServicePriceEntity } from "./service_price_entity";
import { ClientBaseServiceEntity } from "cmp-core/src/entity/clientBaseService";



export type ClientServiceAppointment = {
  Draft: ClientBaseServiceEntity | null;
  Current: ClientBaseServiceEntity | null;
  Next: ClientBaseServiceEntity | null;
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
