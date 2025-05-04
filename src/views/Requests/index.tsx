import { AppDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import ApiTable from "cmp-core/src/Datatable/ApiTable";
import getTableDefinition from "./TableDefinition";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";
import { useInvoicRequestseGetAll } from "data/repository/invoice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useRoleAccess from "hooks/useRoleAccess";
import { GridFilter } from "uikit/src/GridFilter";
import { FILTER_INIT, PaginationSearchParamsType } from "core/src/types/api";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { InvoiceStatus } from "common/domain/enum/invoice_enum";

export default function Requests() {
  const request = useInvoicRequestseGetAll();
  const [statusDialog, setStatusDialog] = useState<InvoiceEntity | null>(null);
  const [status, setstatus] = useState<InvoiceStatus | null>(
    InvoiceStatus.Draft
  );

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

  const closeStatusDialog = () => setStatusDialog(null);

  function open(data: InvoiceEntity) {
    setStatusDialog(data);
  }

  function handleChange(status: InvoiceStatus) {
    setstatus(status);
  }

  return (
    <>
      <Box className="mainPadding">
        <AppDataFetchingWrapper retry={refresh} request={request}>
          <ApiTable<InvoiceEntity>
            title="Requests"
            columnDef={getTableDefinition()}
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
            // endChildren={[
            //   <GridFilter
            //     handleChange={handleChange}
            //     options={InvoiceRequestStatusOptions}
            //     selected={status}
            //   />,
            // ]}
          ></ApiTable>
        </AppDataFetchingWrapper>
      </Box>
    </>
  );
}
