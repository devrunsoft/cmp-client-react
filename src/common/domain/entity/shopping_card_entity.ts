
export type ShoppingCardEntity = {
    Id: number;
    ServicePriceCrmId: string;
    ServiceCrmId: string;
    CompanyId: number;
    Name: string;
    AddressName: string;
    PriceName: string;
    OperationalAddressId: number;
    StartDate: Date,
    FrequencyType: string;
    ServiceKind: number;
    Qty: number;
};
