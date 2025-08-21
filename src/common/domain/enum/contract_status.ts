import { NameAndValue } from "cmp-core/model/nameAndValue";

export enum CompanyContractEnum {
  Created = "Created",
  Send = "Send",
  // Visit = "Visit",
  Signed = "Signed",
  NeedsAdminSignature = "Needs_Admin_Signature",
  Canceled = "Canceld",
}

export const CompanyContractDescriptions: Record<
  CompanyContractEnum,
  string
> = {
  [CompanyContractEnum.Created]: "Created",
  [CompanyContractEnum.Canceled]: "Canceled",
  [CompanyContractEnum.Send]: "Send",
  // [CompanyContractEnum.Visit]: "Visit Scheduled",
  [CompanyContractEnum.Signed]: "Signed",
  [CompanyContractEnum.NeedsAdminSignature]: "Needs Admin Signature",
};

export const CompanyContractOptions: NameAndValue[] = Object.entries(
  CompanyContractEnum
)
  .filter(
    ([_, value]) =>
      value !== CompanyContractEnum.Created 
      // &&
      // value !== CompanyContractEnum.Visit
  )
  .map(([_, value]) => value)
  .map((value) => ({
    name:
      CompanyContractDescriptions[value as CompanyContractEnum] ||
      String(value),
    value,
  }));
