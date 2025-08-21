import { CompanyContractEnum } from "../enum/contract_status";

export type CompanyContractEntity = {
  Id?: number;
  Content: string;
  ContractId: number;
  CompanyId: number;
  InvoiceId: string;
  Sign?: string | null;
  Status: CompanyContractEnum;
  ContractNumber: string;
  CreatedAt: Date;
};
