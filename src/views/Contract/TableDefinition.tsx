import { ColumnDef } from "@tanstack/react-table";
import { IoCardOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { GoClock } from "react-icons/go";
import styles from "../invoices/invoicesTable/invoicesTable.module.css";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { Box } from "@mui/material";
import {
  Cancel,
  Check,
  Visibility,
  Warning,
  WarningAmber,
  X,
} from "@mui/icons-material";
import { ActivitySquare, Clock, Hotel } from "lucide-react";
import { CompanyContractEnum } from "common/domain/enum/contract_status";

export const TableDefinition: ColumnDef<CompanyContractEntity>[] = [
  {
    accessorKey: "ContractNumber",
    header: () => <>Contract Number</>,
  },

  {
    accessorKey: "Status",
    header: () => <>Status</>,
    cell: (info) => {
      const status = info.getValue() as CompanyContractEnum;
      const row = info.row.original;

      return <>{getStatus(status)}</>;
    },
  },
];

const getStatus = (status: CompanyContractEnum) => {
  switch (status) {
    case CompanyContractEnum.Created:
      return (
        <Box
          component="span"
          sx={{
            color: (theme) => theme.palette.warning.main,
          }}
        >
          <Clock /> Contract Created
        </Box>
      );
    case CompanyContractEnum.Send:
      return (
        <Box
          component="span"
          sx={{
            color: (theme) => theme.palette.warning.main,
          }}
        >
          <Clock /> Sent To Client
        </Box>
      );
    // case CompanyContractEnum.Visit:
    //   return (
    //     <Box
    //       component="span"
    //       sx={{
    //         color: (theme) => theme.palette.primary.main,
    //       }}
    //     >
    //       <Visibility /> Visit
    //     </Box>
    //   );
    case CompanyContractEnum.Signed:
      return (
        <Box
          component="span"
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <Check /> Signed
        </Box>
      );
    case CompanyContractEnum.NeedsAdminSignature:
      return (
        <Box
          component="span"
          sx={{
            color: (theme) => "#1E90FF",
          }}
        >
          <WarningAmber /> Needs Admin Signature
        </Box>
      );
      case CompanyContractEnum.Canceled:
        return (
          <Box
            component="span"
            sx={{
              color: (theme) => "#808080",
            }}
          >
            <Cancel /> Canceled
          </Box>
        );
    default:
      return <span className="text-gray-500">---</span>;
  }
};
