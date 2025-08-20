import { Box } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

import { Hotel } from "lucide-react";

import {
  RequestTerminateDescriptions,
  getRequestTerminateStyle,
  RequestTerminateEnum,
} from "cmp-core/src/Enum/requestTerminateStatus";

import { RequestTerminateEntity } from "cmp-core/src/entity/requestTerminate";
import {
  RequestTerminateProcessDecription,
  RequestTerminateProcessEnum,
  RequestTerminateProcessStyles,
} from "cmp-core/src/Enum/requestTerminateProcessStatus";

const TableDefinition: ColumnDef<RequestTerminateEntity>[] = [
  {
    accessorKey: "RequestTerminateNumber",
    header: () => (
      <>
        Request Terminate Number
        <Hotel />
      </>
    ),
  },

  // {
  //   cell: (info) => {
  //     const type = info.getValue() as RequestTerminateEnum;
  //     const status = type!;
  //     return (
  //       <Box
  //         className="Status"
  //         sx={{
  //           backgroundColor: getRequestTerminateStyle(status).background,
  //           color: getRequestTerminateStyle(status).color,
  //         }}
  //       >
  //         {RequestTerminateDescriptions[status]}
  //       </Box>
  //     );
  //   },
  //   accessorKey: "Status",
  //   header: () => (
  //     <>
  //       Status
  //       <Hotel />
  //     </>
  //   ),
  // },
  {
    cell: (info) => {
      const type = info.getValue() as RequestTerminateProcessEnum | null;
      const status = type;
      return status ? (
        <Box
          className="Status"
          sx={{
            backgroundColor: RequestTerminateProcessStyles[status].background,
            color: RequestTerminateProcessStyles[status].color,
          }}
        >
          {RequestTerminateProcessDecription[status]}
        </Box>
      ) : (
        <></>
      );
    },
    accessorKey: "RequestTerminateStatus",
    header: () => (
      <>
        Request Status
        <Hotel />
      </>
    ),
  },
];

export default TableDefinition;
