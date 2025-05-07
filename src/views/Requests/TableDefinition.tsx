import { ColumnDef } from "@tanstack/react-table";
import {
  CorporateFareSharp,
  DateRange,
  LocationSearchingTwoTone,
  Money,
} from "@mui/icons-material";
import { PiIdentificationBadge, PiInvoice } from "react-icons/pi";
import { Box } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import {
  InvoiceStatus,
  InvoiceStatusDescriptions,
  InvoiceStatusStyles,
} from "common/domain/enum/invoice_enum";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";

// type StatusCallback = (Id: number) => React.ReactNode;

const getTableDefinition = (): ColumnDef<InvoiceEntity>[] => {
  return [
    {
      accessorKey: "RequestNumber",
      header: () => (
        <>
          Request Number
          <PiIdentificationBadge />
        </>
      ),
    },

    {
      accessorKey: "Address",
      header: () => (
        <>
          Restaurant Service Address
          <CorporateFareSharp />
        </>
      ),
    },
    {
      size: 110,
      cell: (info) => {
        const status = info.getValue() as InvoiceStatus;
        return (
          <div
            style={{
              background:
                InvoiceStatusStylesRequest[status]?.background || "#ccc",
              padding: "6px 4px",
              borderRadius: "4px",
              color: InvoiceStatusStylesRequest[status]?.color || "#000",
              textAlign: "center",
            }}
          >
            {InvoiceStatusDescriptionsRequest[status]}
          </div>
        );
      },
      accessorKey: "InvoiceStatus",
      header: () => (
        <>
          Status
          <PiInvoice />
        </>
      ),
    },
  ];
};

export const InvoiceStatusDescriptionsRequest: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: "Draft",
  [InvoiceStatus.PendingSignature]: "Pending",
  [InvoiceStatus.NeedsAdminSignature]: "Pending",
  [InvoiceStatus.NeedsAssignment]: "Pending",
  [InvoiceStatus.ProcessingProvider]: "Pending",
  [InvoiceStatus.Complete]: "Complete",
  [InvoiceStatus.Canceled]: "Canceled",
  [InvoiceStatus.UpdatedProvider]: "Updated by Provider",
  [InvoiceStatus.SubmitedProvider]: "Submitted by Provider",
  [InvoiceStatus.SendPayment]: "Waiting For Payment",
  [InvoiceStatus.Deleted]: "Deleted",
  [InvoiceStatus.Scaduled]: "Scaduled",
};

export const InvoiceStatusStylesRequest: Record<
  InvoiceStatus,
  { background: string; color: string }
> = {
  [InvoiceStatus.Draft]: { background: "#C427271A", color: "#C42727" },
  [InvoiceStatus.PendingSignature]:  {
    background: "#FFD7001A",
    color: "#FFD700",
  },
  [InvoiceStatus.NeedsAdminSignature]: {
    background: "#FFD7001A",
    color: "#FFD700",
  },
  [InvoiceStatus.NeedsAssignment]:  {
    background: "#FFD7001A",
    color: "#FFD700",
  },
  [InvoiceStatus.Scaduled]:  {
    background: "#FFD7001A",
    color: "#FFD700",
  },
  [InvoiceStatus.ProcessingProvider]:  {
    background: "#FFD7001A",
    color: "#FFD700",
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

export default getTableDefinition;
