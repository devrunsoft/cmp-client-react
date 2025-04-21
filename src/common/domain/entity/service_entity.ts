export type ServiceEntity = {
  Id: number;
  Name: string;
  Description: string | null;
  ProductType: string;
  CollectionIds: string;
  ServiceCrmId: string;
  Type: number | null;
  ServiceType: number;
  IsEmergency: boolean;
};
