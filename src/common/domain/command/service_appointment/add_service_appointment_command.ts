
export class AddServiceAppointmentCommand {
    OperationalAddressId: number;
    // LocationCompanyId: number;
    // ServiceTypeId: string;
    ServicePriceId: string;
    StartDate: Date;
    FrequencyType: string;
    ServiceCrmId: string;
    ServiceKind: number;
    constructor(
        OperationalAddressId: number,
        // LocationCompanyId: number,
        // ServiceTypeId: string,
        ServicePriceId: string,
        StartDate: Date,
        FrequencyType: string,
        ServiceCrmId: string,
        ServiceKind: number
    ) {
        this.OperationalAddressId = OperationalAddressId;
        // this.LocationCompanyId = LocationCompanyId;
        // this.ServiceTypeId = ServiceTypeId;
        this.ServicePriceId = ServicePriceId;
        this.StartDate = StartDate;
        this.FrequencyType = FrequencyType;
        this.ServiceCrmId = ServiceCrmId;
        this.ServiceKind = ServiceKind;
    }
}
