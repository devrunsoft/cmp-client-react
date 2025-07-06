export class BillingInfromationCommand {
  CardholderName: string;
  CardNumber: string;
  Expiry: number;
  CVC: string;
  Address: string;
  City: string;
  State: string;
  ZIPCode: string;
  IsPaypal: boolean;
  Id?: number;
  constructor(
    CardholderName: string,
    CardNumber: string,
    Expiry: number,
    CVC: string,
    Address: string,
    City: string,
    State: string,
    ZIPCode: string,
    IsPaypal: boolean,
    Id?: number
  ) {
    this.CardholderName = CardholderName;
    this.CardNumber = CardNumber;
    this.Expiry = Expiry;
    this.CVC = CVC;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.ZIPCode = ZIPCode;
    this.IsPaypal = IsPaypal;
    this.Id = Id;
  }
}

export type InfromationCommand = {
  CorporateAddress: string;
  BilingInformationInputs: BillingInfromationCommand[];
};
