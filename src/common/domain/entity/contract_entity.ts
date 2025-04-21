export type CompanyContractEntity = {
  Id?: number;
  Content: string;
  ContractId: number;
  CompanyId: number;
  InvoiceId: string;
  Sign?: string | null;
  Status: number;
  ContractNumber: string;
  CreatedAt: Date;
};
