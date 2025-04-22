export enum InvoiceStatus {
  Draft = 1,
  PendingSignature = 2,
  NeedsAdminSignature = 3,
  NeedsAssignment = 4,
  ProcessingProvider = 5,
  Complete = 6,
  Canceled = 7,
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
  };

  return mapping[status] ?? null;
};

export const InvoiceStatusStyles: Record<
  InvoiceStatus,
  { background: string; color: string }
> = {
  [InvoiceStatus.Draft]: { background: "#C427271A", color: "#C42727" }, // Red shade
  [InvoiceStatus.PendingSignature]: {
    background: "#D573001A",
    color: "#D57300",
  }, // Orange shade
  [InvoiceStatus.NeedsAdminSignature]: {
    background: "#1E90FF1A",
    color: "#1E90FF",
  }, // Blue shade
  [InvoiceStatus.NeedsAssignment]: {
    background: "#FFD7001A",
    color: "#FFD700",
  }, // Yellow shade
  [InvoiceStatus.ProcessingProvider]: {
    background: "#4CAF501A",
    color: "#4CAF50",
  }, // Green shade
  [InvoiceStatus.Complete]: { background: "#0080001A", color: "#008000" }, // Dark Green
  [InvoiceStatus.Canceled]: { background: "#8080801A", color: "#808080" }, // Gray shade
};

export const InvoiceStatusDescriptions: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: "Draft",
  [InvoiceStatus.PendingSignature]: "Pending Signature",
  [InvoiceStatus.NeedsAdminSignature]: "Needs Admin Signature",
  [InvoiceStatus.NeedsAssignment]: "Needs Assignment",
  [InvoiceStatus.ProcessingProvider]: "Processing Provider",
  [InvoiceStatus.Complete]: "Complete",
  [InvoiceStatus.Canceled]: "Canceled",
};

// Convert enum to dropdown options
export interface NameAndValue {
  name: string;
  value: number;
}

export const InvoiceStatusOptions: NameAndValue[] = Object.entries(
  InvoiceStatus
)
  .filter(([_, value]) => typeof value === "number") // Ensure only numeric values are considered
  .map(([key, value]) => ({
    name: InvoiceStatusDescriptions[value as InvoiceStatus] || key, // Get formatted name
    value: value as number,
  }));
