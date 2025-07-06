import { NameAndValue } from "core/src/types/nameAndValue";
import {
  BillingInfromationCommand,
  InfromationCommand,
} from "../command/billing_information_command";

export type BillingInfromationEntity = {
  Id: number;
  CardholderName: string;
  CardNumber: string;
  Expiry: number;
  CVC: string;
  Address: string;
  City: string;
  State: string;
  ZIPCode: string;
  IsPaypal: boolean;
};

export type InfromationEntity = {
  CorporateAddress: string;
  billingInformation: BillingInfromationEntity[];
};

export function mapBillingEntityToCommand(
  entity: BillingInfromationEntity
): BillingInfromationCommand {
  return new BillingInfromationCommand(
    entity.CardholderName,
    entity.CardNumber,
    entity.Expiry,
    entity.CVC,
    entity.Address,
    entity.City,
    entity.State,
    entity.ZIPCode,
    entity.IsPaypal,
    entity.Id
  );
}

export function mapBillingEntityToNameAndValue(
  entity: BillingInfromationEntity
): NameAndValue {
  return {
    name: entity.Address,
    value: entity.Id,
  };
}

/** Maps a full InfromationEntity to InfromationCommand */
export function mapInformationEntityToCommand(
  entity: InfromationEntity
): InfromationCommand {
  return {
    CorporateAddress: entity.CorporateAddress,
    BilingInformationInputs: entity.billingInformation.map((e) =>
      mapBillingEntityToCommand(e)
    ),
  };
}
