import { RequestTerminateEnum } from "cmp-core/src/Enum/requestTerminateStatus";

export type RequestTerminateCommand = {
    InvoiceNumber: string,
    Message: string,
    Status: RequestTerminateEnum,
  }
