import { AppDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import ApiTable from "cmp-core/src/Datatable/ApiTable";
import getTableDefinition from "./TableDefinition";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GridFilter } from "uikit/src/GridFilter";
import { useCreatedInvoiceGetAll } from "data/repository/invoice";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { FILTER_INIT, PaginationSearchParamsType } from "core/src/types/api";
import ShowInvoice from "components/Invoice/invoice_modal";
import { InvoiceCreateStatusOptions } from "common/domain/enum/invoice_enum";

export default function Invoices() {
  const request = useCreatedInvoiceGetAll();
  const [invoiceModel, setStatusDialog] = useState<InvoiceEntity | null>(null);
  const [status, setstatus] = useState<number | null>(null);

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

  function handleChange(status: number) {
    setstatus(status);
  }

  return (
    <>
      <Box className="mainPadding">
        <AppDataFetchingWrapper retry={refresh} request={request}>
          <ApiTable<InvoiceEntity>
            title="Invoices"
            removeId={true}
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
            endChildren={[
              <GridFilter
                handleChange={handleChange}
                options={InvoiceCreateStatusOptions}
                selected={status}
              />,
            ]}
          ></ApiTable>
        </AppDataFetchingWrapper>
        {/* </Paper> */}

        {invoiceModel && (
          <ShowInvoice
            open={!!invoiceModel}
            onClose={() => {
              closeStatusDialog();
            }}
            refresh={() => {
              refresh();
            }}
            model={invoiceModel}
          />
        )}
      </Box>
    </>
  );
}
