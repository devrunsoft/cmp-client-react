export type AddShoppingCardCommand = {
  OperationalAddressId: number;
  // ServiceTypeId: string;
  ProductPriceId: number;
  StartDate?: Date;
  FrequencyType: string;
  ServiceKind: number;
  LocationCompanyIds: number[];
  Qty: number;
  ProductId: number;
  DayOfWeek: string[];
  FromHour: number;
  ToHour: number;
};
