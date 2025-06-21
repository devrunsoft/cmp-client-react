import { ColumnDef } from "@tanstack/react-table";
import {
  CorporateFareSharp,
  DateRange,
  LocationSearchingTwoTone,
  Money,
} from "@mui/icons-material";
import { PiIdentificationBadge, PiInvoice } from "react-icons/pi";
import { Box, Button } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import {
  InvoiceStatus,
  InvoiceStatusDescriptions,
  InvoiceStatusStyles,
} from "common/domain/enum/invoice_enum";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";

// type StatusCallback = (Id: number) => React.ReactNode;

const getTableDefinition = (
  statusRenderer: (id: InvoiceEntity) => void
): ColumnDef<InvoiceEntity>[] => {
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
        const theme = useTheme();
        const status = info.getValue() as string;
        const invoice = info.row.original;
        return (
          <Box textAlign="center" sx={{display:"flex" , flexDirection:"column"}}>
            <div
              style={{
                background: InvoiceStatusStyles[status]?.background || "#ccc",
                padding: "6px 4px",
                borderRadius: "4px",
                color: InvoiceStatusStyles[status]?.color || "#000",
                marginBottom: "4px",
              }}
            >
              {InvoiceStatusDescriptions[status]}
            </div>

            {status === InvoiceStatus.Draft && (
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  statusRenderer(invoice)
                }}
              >
                Cancel Request
              </Button>
            )}
          </Box>
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

export default getTableDefinition;
