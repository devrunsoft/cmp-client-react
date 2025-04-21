import { BaseServiceAppointmentEntity } from "./service_appointment_entity";

export type InvoiceEntity = {
  Id: number;
  CompanyId: number;
  ProductCrmId: string;
  ProductPriceCrmId: string;
  InvoiceCrmId: string;
  InvoiceNumber: string;
  Status: number;
  InvoiceStatus: string;
  Link: string;
  InvoiceId: string;
  Amount: number;
  CreatedAt: Date;
  BaseServiceAppointment: BaseServiceAppointmentEntity[];
};
