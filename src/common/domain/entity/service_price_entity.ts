import { ServiceEntity } from "./service_entity";

export type ServicePriceEntity = {
  Id: number;
  Name: string;
  Amount: number;
  BillingPeriod: number;
  NumberofPayments: number;
  SetupFee: number;
  ServiceCrmId: string;
  ServicePriceCrmId: string;
  Product: ServiceEntity;
  Enable: boolean;
};
