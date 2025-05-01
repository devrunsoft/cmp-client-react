export enum InvoiceStatus {
  Draft = "Draft",
  PendingSignature = "Pending_Signature",
  NeedsAdminSignature = "Needs_Admin_Signature",
  NeedsAssignment = "Needs_Assignment",
  ProcessingProvider = "Processing_Provider",
  Complete="Complete",
  Canceled="Canceled",
  UpdatedProvider="Updated_Provider",
  SubmitedProvider="Submited_Provider",
  SendPayment="Send_Payment",
  Deleted="Deleted",
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
    Deleted: InvoiceStatus.Deleted,
  };

  return mapping[status] ?? null;
};

// ✅ Style mapping
export const InvoiceStatusStyles: Record<
  InvoiceStatus,
  { background: string; color: string }
> = {
  [InvoiceStatus.Draft]: { background: "#C427271A", color: "#C42727" },
  [InvoiceStatus.PendingSignature]: {
    background: "#D573001A",
    color: "#D57300",
  },
  [InvoiceStatus.NeedsAdminSignature]: {
    background: "#FFD7001A",
    color: "#FFD700",
  },
  [InvoiceStatus.NeedsAssignment]: {
    background: "#1E90FF1A",
    color: "#1E90FF",
  },
  [InvoiceStatus.ProcessingProvider]: {
    background: "#4CAF501A",
    color: "#4CAF50",
  },
  [InvoiceStatus.Complete]: { background: "#0080001A", color: "#008000" },
  [InvoiceStatus.Canceled]: { background: "#8080801A", color: "#808080" },
  [InvoiceStatus.UpdatedProvider]: {
    background: "#17A2B81A",
    color: "#17A2B8",
  },
  [InvoiceStatus.SubmitedProvider]: {
    background: "#007BFF1A",
    color: "#007BFF",
  },
  [InvoiceStatus.SendPayment]: { background: "#9C27B01A", color: "#9C27B0" },
  [InvoiceStatus.Deleted]: { background: "#FF00001A", color: "#FF0000" }, // 🔴 Red for deleted
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
  [InvoiceStatus.SendPayment]: "Waiting For Payment",
  [InvoiceStatus.Deleted]: "Deleted",
};

// ✅ Convert enum to dropdown options
export interface NameAndValue {
  name: string;
  value: string;
}

export const InvoiceStatusOptions: NameAndValue[] = Object.entries(
  InvoiceStatus
)
  .map(([key, value]) => ({
    name: InvoiceStatusDescriptions[value as InvoiceStatus] || key,
    value: value as string,
  }));
