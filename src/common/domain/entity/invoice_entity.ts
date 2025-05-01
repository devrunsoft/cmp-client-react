import { InvoiceStatus } from "../enum/invoice_enum";
import { BaseServiceAppointmentEntity } from "./service_appointment_entity";

export type InvoiceEntity = {
  Id: number;
  CompanyId: number;
  RequestNumber: number;
  ProductCrmId: string;
  ProductPriceCrmId: string;
  InvoiceCrmId: string;
  InvoiceNumber: string;
  Status: InvoiceStatus;
  InvoiceStatus: InvoiceStatus;
  Link: string;
  InvoiceId: string;
  Amount: number;
  CreatedAt: Date;
  BaseServiceAppointment: BaseServiceAppointmentEntity[];
};
