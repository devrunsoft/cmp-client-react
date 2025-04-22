export class EditProfileCommand {
    companyName: string;
    primaryFirstName: string;
    primaryLastName: string;
    PrimaryPhonNumber: string;
    position: string;
    secondaryFirstName: string;
    secondaryLastName: string;
    secondaryPhoneNumber: string;
    BillingAddress: string;
    City: string;
    ZIPCode: string;
    State: string;


    constructor(
        companyName: string,
        primaryFirstName: string,
        primaryLastName: string,
        PrimaryPhonNumber: string,
        position: string,
        secondaryFirstName: string,
        secondaryLastName: string,
        secondaryPhoneNumber: string,
        BillingAddress: string,
        City: string,
        ZIPCode: string,
        State: string,
    ) {
        this.companyName = companyName;
        this.primaryFirstName = primaryFirstName;
        this.primaryLastName = primaryLastName;
        this.PrimaryPhonNumber = PrimaryPhonNumber;
        this.position = position;
        this.secondaryFirstName = secondaryFirstName;
        this.secondaryLastName = secondaryLastName;
        this.secondaryPhoneNumber = secondaryPhoneNumber;
        this.BillingAddress = BillingAddress;
        this.City = City;
        this.ZIPCode = ZIPCode;
        this.State = State;

    }
}
