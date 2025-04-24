export enum InvoiceStatus {
  Draft = 1,
  PendingSignature = 2,
  NeedsAdminSignature = 3,
  NeedsAssignment = 4,
  ProcessingProvider = 5,
  Complete = 6,
  Canceled = 7,
  UpdatedProvider = 8,
  SubmitedProvider = 9,
  SendPayment = 10,
}

// ✅ Mapping function: Convert server enum string to TypeScript enum
export const parseInvoiceStatus = (status: string): InvoiceStatus | null => {
  const mapping: Record<string, InvoiceStatus> = {
    Draft: InvoiceStatus.Draft,
    Pending_Signature: InvoiceStatus.PendingSignature,
    Needs_Admin_Signature: InvoiceStatus.NeedsAdminSignature,
    Needs_Assignment: InvoiceStatus.NeedsAssignment,
    Processing_Provider: InvoiceStatus.ProcessingProvider,
    Complete: InvoiceStatus.Complete,
    Canceled: InvoiceStatus.Canceled,
    Updated_Provider: InvoiceStatus.UpdatedProvider,
    Submited_Provider: InvoiceStatus.SubmitedProvider,
    Send_Payment: InvoiceStatus.SendPayment,
  };

  return mapping[status] ?? null;
};

// ✅ Style mapping
export const InvoiceStatusStyles: Record<
  InvoiceStatus,
  { background: string; color: string }
> = {
  [InvoiceStatus.Draft]: { background: "#C427271A", color: "#C42727" },
  [InvoiceStatus.PendingSignature]: { background: "#D573001A", color: "#D57300" },
  [InvoiceStatus.NeedsAdminSignature]: { background: "#FFD7001A", color: "#FFD700" },
  [InvoiceStatus.NeedsAssignment]: { background: "#1E90FF1A", color: "#1E90FF" },
  [InvoiceStatus.ProcessingProvider]: { background: "#4CAF501A", color: "#4CAF50" },
  [InvoiceStatus.Complete]: { background: "#0080001A", color: "#008000" },
  [InvoiceStatus.Canceled]: { background: "#8080801A", color: "#808080" },
  [InvoiceStatus.UpdatedProvider]: { background: "#17A2B81A", color: "#17A2B8" }, // Info shade
  [InvoiceStatus.SubmitedProvider]: { background: "#007BFF1A", color: "#007BFF" }, // Primary blue
  [InvoiceStatus.SendPayment]: { background: "#9C27B01A", color: "#9C27B0" }, // Purple shade
};

// ✅ Description mapping
export const InvoiceStatusDescriptions: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: "Draft",
  [InvoiceStatus.PendingSignature]: "Pending Signature",
  [InvoiceStatus.NeedsAdminSignature]: "Needs Admin Signature",
  [InvoiceStatus.NeedsAssignment]: "Needs Assignment",
  [InvoiceStatus.ProcessingProvider]: "Processing Provider",
  [InvoiceStatus.Complete]: "Complete",
  [InvoiceStatus.Canceled]: "Canceled",
  [InvoiceStatus.UpdatedProvider]: "Updated by Provider",
  [InvoiceStatus.SubmitedProvider]: "Submitted by Provider",
  [InvoiceStatus.SendPayment]: "Payment Sent",
};

// ✅ Convert enum to dropdown options
export interface NameAndValue {
  name: string;
  value: number;
}

export const InvoiceStatusOptions: NameAndValue[] = Object.entries(
  InvoiceStatus
)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({
    name: InvoiceStatusDescriptions[value as InvoiceStatus] || key,
    value: value as number,
  }));
