import ApiTable from "cmp-core/src/Datatable/ApiTable";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableDefinition from "./TableDefinition";
import { ManifestEntity } from "common/domain/entity/manifest";
import { GridDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import { GridFilter } from "uikit/src/GridFilter";
import {
  ManifestStatus,
  ManifestStatusClientOptions,
  ManifestStatusDescriptions,
  ManifestStatusOptions,
} from "cmp-core/src/Enum/manifestStatus";
import { useAppSelector } from "state/index";
import { useClientManifestGetPaginate } from "data/repository/manifest";
import { FILTER_INIT, PaginationSearchParamsType } from "core/src/types/api";

export default function Invoices() {
  const [statusDialog, setStatusDialog] = useState<ManifestEntity | null>(null);
  const [status, setstatus] = useState<ManifestStatus | null>(null);
  const refreshAddress = useAppSelector((state) => state.addressSlice);
  const request = useClientManifestGetPaginate(refreshAddress.Id ?? 0);

  const loadData = (
    filter: PaginationSearchParamsType,
    page: number,
    PAGE_SIZE: number
  ) => {
    request.call({
      data: {
        ...filter,
      },
      params: {
        Status: status,
        Size: PAGE_SIZE,
        Page: page,
        allField: filter.allField,
      },
    });
  };

  useEffect(() => {
    refresh();
  }, [status, refreshAddress.Id]);

  const { setFilter, setPage, refresh, page } =
    useFilterData<PaginationSearchParamsType>({
      initData: FILTER_INIT,
      handleFetchFn: loadData,
      autoFetch: false,
    });

  function open(data: ManifestEntity) {
    setStatusDialog(data);
  }

  function handleChange(status: ManifestStatus) {
    setstatus(status);
  }

  return (
    <>
      {/* <Paper
        rounded="lg"
        variant="outlined"
        sx={{p: "23px"}}
      > */}
      <Box className="mainPadding">
        <GridDataFetchingWrapper retry={refresh} request={request}>
          <ApiTable<ManifestEntity>
            title="Manifests"
            removeId={true}
            columnDef={TableDefinition}
            data={request.data?.data?.elements || []}
            loadData={(v) =>
              setFilter({ allField: (v?.filterAll as string) || "" })
            }
            filterAllTitle="search"
            totalRows={request.data?.data?.totalElements || 1}
            loadPage={setPage}
            pageCount={request.data?.data?.totalPages}
            page={page}
            onSingleRowSelection={(s) => open(s)}
            loading={request.loading}
            endChildren={[
              <GridFilter
                handleChange={handleChange}
                options={ManifestStatusClientOptions}
                selected={status}
              />,
            ]}
          ></ApiTable>
        </GridDataFetchingWrapper>
        {/* {statusDialog && (
          <ManifestWindow
            open={!!statusDialog}
            onClose={() => {
              setStatusDialog(null);
            }}
            selected={statusDialog!}
            refresh={() => refresh()}
          />
        )} */}
      </Box>
    </>
  );
}
