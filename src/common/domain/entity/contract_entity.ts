import { ContractStatis } from "../enum/contract_status";

export type CompanyContractEntity = {
  Id?: number;
  Content: string;
  ContractId: number;
  CompanyId: number;
  InvoiceId: string;
  Sign?: string | null;
  Status: ContractStatis;
  ContractNumber: string;
  CreatedAt: Date;
};
