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
import { ProviderEntity } from "cmp-core/entity/ProviderEntity";
import { InvoiceEntity } from "cmp-core/src/entity/InvoiceEntity";
import { dateOnlyFormat } from "cmp-core/src/utils/date";
import {
  InvoiceStatus,
  InvoiceStatusDescriptions,
  InvoiceStatusStyles,
  parseInvoiceStatus,
} from "common/domain/enum/invoice_enum";
import styles from "../invoices/invoicesTable/invoicesTable.module.css";
import { IoCardOutline, IoTrash } from "react-icons/io5";

const getTableDefinition = (): ColumnDef<InvoiceEntity>[] => {
  return [
    {
      accessorKey: "InvoiceNumber",
      header: () => (
        <>
          InvoiceNumber
          <PiIdentificationBadge />
        </>
      ),
    },
    {
      cell: (info) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(info.getValue() as number);
      },
      accessorKey: "Amount",
      header: () => (
        <>
          Amount
          <Money />
        </>
      ),
    },
    {
      accessorKey: "CreatedAt",
      cell: (info) => dateOnlyFormat(info.getValue() as string),
      header: () => (
        <>
         Created At
          <DateRange />
        </>
      ),
    },

    {
      size: 110,
      cell: (info) => {
        const theme = useTheme();
        const type = info.getValue() as InvoiceStatus;

        return getStatus(type);
      },
      accessorKey: "InvoiceStatus",
      header: () => (
        <>
          Status
          <PiInvoice />
        </>
      ),
    },
    {
      cell: (info) => {
        const status = info.getValue();
        return (
          <Box
            component="span"
            sx={{
              color: (theme) =>
                status ? theme.palette.lightGreen : theme.palette.error.main,
            }}
            onClick={(event) => {
              event.stopPropagation();
              //   statusRenderer(status as ProviderEntity);
            }}
          >
            {!status ? (
              <div />
            ) : (
              <div
                style={{
                  background: "#0073E61A",
                  padding: "6px 4px",
                  borderRadius: "4px",
                  color: "#0073E6",
                  textAlign: "center",
                }}
              >
                {(status as ProviderEntity).Name}
              </div>
            )}
          </Box>
        );
      },
      accessorKey: "Provider",
      header: () => (
        <>
          Provider
          <LocationSearchingTwoTone />
        </>
      ),
    },
  ];
};

export default getTableDefinition;

// @keyframes blinkRedBackground {
//     0%,
//     100% {
//       background: rgba(76, 142, 59, 1);
//     }
//     50% {
//       background: rgba(129, 199, 132, 1);
//     }
//   }

const getStatus = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.SendPayment:
      return (
        <div className={styles.buttonsDraft}>
          <a className={styles.buttonPayable2}>
            <IoCardOutline size={"24px"} />
            Pay
          </a>
        </div>
      );

    default:
      return (
        <div
          style={{
            background: InvoiceStatusStyles[status]?.background || "#ccc",
            padding: "6px 4px",
            borderRadius: "4px",
            color: InvoiceStatusStyles[status]?.color || "#000",
            textAlign: "center",
          }}
        >
          {InvoiceStatusDescriptions[status]}
        </div>
      );
  }
};
