import { ColumnDef } from "@tanstack/react-table";
import { Hotel } from "lucide-react";

import { ManifestEntity } from "common/domain/entity/manifest";
import {
  getManifestStatusDescription,
  getManifestStatusStyle,
  ManifestStatus,
  ManifestStatusDescriptions,
} from "cmp-core/src/Enum/manifestStatus";
import { Box } from "@mui/material";

const TableDefinition: ColumnDef<ManifestEntity>[] = [
  {
    accessorKey: "ManifestNumber",
    header: () => (
      <>
        Manifest Number
        <Hotel />
      </>
    ),
  },
  {
    accessorKey: "Invoice.Company.CompanyName",
    header: () => (
      <>
        Client
        <Hotel />
      </>
    ),
  },
  {
    cell: (info) => {
      const type = info.getValue() as ManifestStatus;
      const status = type!;
      return (
        <Box
          className="Status"
          sx={{
            backgroundColor: getManifestStatusStyle(status).background,
            color: getManifestStatusStyle(status).color,
          }}
        >
          {ManifestStatusDescriptions[status]}
        </Box>
      );
    },
    accessorKey: "Status",
    header: () => (
      <>
        Status
        <Hotel />
      </>
    ),
  },
  {
    accessorKey: "Invoice.Provider.Name",
    cell: (info) => {
      const name = info.getValue() as string;
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
          {!name ? (
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
              {name}
            </div>
          )}
        </Box>
      );
    },
    header: () => (
      <>
        Provider
        <Hotel />
      </>
    ),
  },
];

export default TableDefinition;
