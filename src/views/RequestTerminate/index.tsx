import ApiTable from "cmp-core/src/Datatable/ApiTable";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";
import {
  FILTER_INIT,
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";
import { Box } from "@mui/material";
import TableDefinition from "./TableDefinition";

// import ManifestWindow from "./Window";
import { GridDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import { GridFilter } from "uikit/src/GridFilter";
import { RequestTerminateEntity } from "cmp-core/src/entity/requestTerminate";
import {
  RequestTerminateEnum,
  RequestTerminateOptions,
} from "cmp-core/src/Enum/requestTerminateStatus";
import { useRequestTerminateGetAll } from "data/repository/requestTerminate";

export default function Invoices() {
  const request = useRequestTerminateGetAll();
  const [statusDialog, setStatusDialog] =
    useState<RequestTerminateEntity | null>(null);
  const [status, setstatus] = useState<RequestTerminateEnum | null>(null);

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
    if (status !== null) {
      refresh();
    }
  }, [status]);

  const { setFilter, setPage, refresh, page } =
    useFilterData<PaginationSearchParamsType>({
      initData: FILTER_INIT,
      handleFetchFn: loadData,
    });

  function open(data: RequestTerminateEntity) {
    setStatusDialog(data);
  }

  function handleChange(status: RequestTerminateEnum) {
    setstatus(status);
  }

  return (
    <>
      <Box className="mainPadding">
        <GridDataFetchingWrapper retry={refresh} request={request}>
          <ApiTable<RequestTerminateEntity>
            title="Terminate Requests"
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
                options={RequestTerminateOptions}
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
