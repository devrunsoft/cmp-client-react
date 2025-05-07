import { ColumnDef } from "@tanstack/react-table";
import { IoCardOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { GoClock } from "react-icons/go";
import styles from "../invoices/invoicesTable/invoicesTable.module.css";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { ContractStatis } from "common/domain/enum/contract_status";
import { Box } from "@mui/material";
import {
  Check,
  Visibility,
  Warning,
  WarningAmber,
  X,
} from "@mui/icons-material";
import { ActivitySquare, Clock, Hotel } from "lucide-react";

export const TableDefinition: ColumnDef<CompanyContractEntity>[] = [
  {
    accessorKey: "ContractNumber",
    header: () => <>Contract Number</>,
  },

  {
    accessorKey: "Status",
    header: () => <>Status</>,
    cell: (info) => {
      const status = info.getValue() as ContractStatis;
      const row = info.row.original;

      return <>{getStatus(status)}</>;
    },
  },
];

const getStatus = (status: ContractStatis) => {
  switch (status) {
    case ContractStatis.Send:
    case ContractStatis.Visit:
      return (
        <div className={styles.buttonsDraft}>
          <a className={styles.buttonPayable2}>
            <IoCardOutline size={"24px"} />
            Ready for Sign
          </a>
        </div>
      );

    case ContractStatis.Signed:
      return (
        <Box
          sx={{
            color: (theme) => theme.palette.primary.main,
            textAlign: "center",
          }}
        >
          <Check /> Signed
        </Box>
      );
    case ContractStatis.NeedsAdminSignature:
      return (
        <Box
          sx={{
            color: (theme) => theme.palette.warning.main,
            textAlign: "center",
          }}
        >
          <Clock /> Pending
        </Box>
      );
    default:
      return <span className="text-gray-500">---</span>;
  }
};
