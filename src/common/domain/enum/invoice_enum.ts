// Invoice status enum
export enum InvoiceStatus {
  Draft = "Draft",
  PendingSignature = "Pending_Signature",
  NeedsAdminSignature = "Needs_Admin_Signature",
  NeedsAssignment = "Needs_Assignment",
  ProcessingProvider = "Processing_Provider",
  Complete = "Complete",
  Canceled = "Canceled",
  UpdatedProvider = "Updated_Provider",
  SubmitedProvider = "Submited_Provider",
  SendPayment = "Send_Payment",
  Deleted = "Deleted",
  Scaduled = "Scaduled", // ✅ New status
}

// ✅ Mapping function: Convert raw string to enum
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
    Deleted: InvoiceStatus.Deleted,
    Scaduled: InvoiceStatus.Scaduled,
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
  [InvoiceStatus.UpdatedProvider]: { background: "#17A2B81A", color: "#17A2B8" },
  [InvoiceStatus.SubmitedProvider]: { background: "#007BFF1A", color: "#007BFF" },
  [InvoiceStatus.SendPayment]: { background: "#9C27B01A", color: "#9C27B0" },
  [InvoiceStatus.Deleted]: { background: "#FF00001A", color: "#FF0000" },
  [InvoiceStatus.Scaduled]: { background: "#00BCD41A", color: "#00BCD4" }, // ✅ New style
};

// ✅ Description mapping
export const InvoiceStatusDescriptions: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: "Draft",
  [InvoiceStatus.PendingSignature]: "Pending Signature",
  [InvoiceStatus.NeedsAdminSignature]: "Needs Admin Signature",
  [InvoiceStatus.NeedsAssignment]: "Needs Assignment",
  [InvoiceStatus.ProcessingProvider]: "Processing Provider",
  [InvoiceStatus.Complete]: "Paid",
  [InvoiceStatus.Canceled]: "Canceled",
  [InvoiceStatus.UpdatedProvider]: "Updated by Provider",
  [InvoiceStatus.SubmitedProvider]: "Submitted by Provider",
  [InvoiceStatus.SendPayment]: "Pay",
  [InvoiceStatus.Deleted]: "Deleted",
  [InvoiceStatus.Scaduled]: "Scheduled", // ✅ New description
};

// ✅ Dropdown model
export interface NameAndValue {
  name: string;
  value: string;
}

// ✅ Create dropdown options (for invoice creation)
export const InvoiceCreateStatusOptions: NameAndValue[] = Object.entries(
  InvoiceStatus
)
  .filter(([_, value]) =>
    value === InvoiceStatus.SendPayment ||
    value === InvoiceStatus.Complete ||
    value === InvoiceStatus.Scaduled // ✅ Optional: include if needed
  )
  .map(([key, value]) => ({
    name: InvoiceStatusDescriptions[value as InvoiceStatus] || key,
    value: value as string,
  }));

// ✅ Request dropdown options (for filtering)
export const InvoiceRequestStatusOptions: NameAndValue[] = Object.entries(
  InvoiceStatus
)
  .filter(([_, value]) =>
    value === InvoiceStatus.Draft ||
    value === InvoiceStatus.Deleted ||
    value === InvoiceStatus.Canceled ||
    value === InvoiceStatus.Scaduled // ✅ Optional: include if needed
  )
  .map(([key, value]) => ({
    name: InvoiceStatusDescriptions[value as InvoiceStatus] || key,
    value: value as string,
  }));
