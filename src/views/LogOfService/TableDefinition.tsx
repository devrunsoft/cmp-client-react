import { ColumnDef } from "@tanstack/react-table";
import { DateRange, Money } from "@mui/icons-material";

import { BaseServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";
import { CgProductHunt } from "react-icons/cg";
import { SiStatuspage } from "react-icons/si";
import { Box } from "@mui/material";
import {
  getStatusStyleFromString,
  ServiceStatus,
} from "cmp-core/src/Enum/serviceStatus";
import { PiInvoice } from "react-icons/pi";
import { dateOnlyFormat } from "cmp-core/src/utils/date";

const TableDefinition: ColumnDef<BaseServiceAppointmentEntity>[] = [
  {
    accessorKey: "Product.Name",
    header: () => (
      <>
        Product
        <CgProductHunt />
      </>
    ),
  },
  {
    accessorKey: "ProductPrice.Name",
    header: () => (
      <>
        Product Item
        <CgProductHunt />
      </>
    ),
  },
  {
    accessorKey: "Amount",
    cell: (info) => {
      return `$${info.getValue() as string}`;
    },
    header: () => (
      <>
        Amount
        <CgProductHunt />
      </>
    ),
  },
  {
    accessorKey: "StartDate",
    cell: (info) => dateOnlyFormat(info.getValue() as string),
    header: () => (
      <>
        Start Date
        <DateRange />
      </>
    ),
  },
  {
    size: 50,
    cell: (info) => {
      const status = info.getValue() as ServiceStatus;
      return (
        <Box
          sx={{
            top: 10,
            right: 10,
            backgroundColor: getStatusStyleFromString(status).background,
            color: getStatusStyleFromString(status).color,
            fontSize: "12px",
            fontWeight: "bold",
            padding: "4px 10px",
            textAlign: "center",
            borderRadius: "10px",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {status}
        </Box>
      );
    },
    accessorKey: "Status",
    header: () => (
      <>
        Status
        <PiInvoice />
      </>
    ),
  },
];

export default TableDefinition;
