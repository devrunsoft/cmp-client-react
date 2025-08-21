import { GridDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import ApiTable from "cmp-core/src/Datatable/ApiTable";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCompanyContractGetAll } from "data/repository/companyContract";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { FILTER_INIT, PaginationSearchParamsType } from "core/src/types/api";
import SignContract from "./signContract/signContract";
import { TableDefinition } from "./TableDefinition";
import { useAppSelector } from "state/index";
import { GridFilter } from "uikit/src/GridFilter";
import {
  CompanyContractEnum,
  CompanyContractOptions,
} from "common/domain/enum/contract_status";

export default function ContractTable({ contractId }: { contractId?: number }) {
  const refreshAddress = useAppSelector((state) => state.addressSlice);
  const request = useCompanyContractGetAll(refreshAddress.Id ?? 0);
  const [status, setstatus] = useState<CompanyContractEnum | null>(null);

  const navigate = useNavigate();
  const [
    invoiceModel,
    setInvoiceModel,
  ] = useState<CompanyContractEntity | null>(null);

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
  }, [refreshAddress.Id, status]);

  const { setFilter, setPage, refresh, page } = useFilterData<
    PaginationSearchParamsType
  >({
    initData: FILTER_INIT,
    handleFetchFn: loadData,
    autoFetch: false,
  });

  const openContract = (data) => {
    // if (data.Status == 3) return;
    setInvoiceModel(data);
    // setInvoiceModalIsOpen(true);
  };
  function handleChange(status: CompanyContractEnum) {
    setstatus(status);
  }

  return (
    <>
      <Box className="mainPadding">
        <GridDataFetchingWrapper retry={refresh} request={request}>
          <ApiTable<CompanyContractEntity>
            title="Contract Drafts"
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
            onSingleRowSelection={(s) => {
              openContract(s);
            }}
            endChildren={[
              <GridFilter
                handleChange={handleChange}
                options={CompanyContractOptions}
                selected={status}
              />,
            ]}
            loading={request.loading}
          ></ApiTable>
          {invoiceModel && (
            <SignContract
              open={!!invoiceModel}
              onClose={() => {
                setInvoiceModel(null);
              }}
              refresh={() => {
                refresh();
              }}
              model={invoiceModel}
            />
          )}
        </GridDataFetchingWrapper>
      </Box>
    </>
  );
}
