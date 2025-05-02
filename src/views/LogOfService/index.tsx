import { AppDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import ApiTable from "cmp-core/src/Datatable/ApiTable";
import TableDefinition from "./TableDefinition";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus } from "lucide-react";

import { GridFilter } from "uikit/src/GridFilter";
import { BaseServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";
import { useClientServiceGetAll } from "data/repository/service";
import { FILTER_INIT, PaginationSearchParamsType } from "core/src/types/api";
import {
  LogOfServiceEnum,
  LogOfServiceEnumOptions,
} from "cmp-core/src/Enum/logOfServiceEnum";

export default function LogOfService() {
  const request = useClientServiceGetAll();
  const [selected, setSelected] =
    useState<Partial<BaseServiceAppointmentEntity> | null>(null);
  const [isProviderDialog, setIsProviderDialog] = useState<boolean>(false);
  const [status, setstatus] = useState<LogOfServiceEnum | null>(null);
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

  return (
    <>
      <Box className="mainPadding">
        <AppDataFetchingWrapper retry={refresh} request={request}>
          <ApiTable<BaseServiceAppointmentEntity>
            title="Log Of Services"
            columnDef={TableDefinition}
            data={request.data?.data?.elements || []}
            loadData={(v) =>
              setFilter({ allField: (v?.filterAll as string) || "" })
            }
            isRowSelected={(i) => i.Id === selected?.Id}
            filterAllTitle="search"
            totalRows={request.data?.data?.totalElements || 1}
            loadPage={setPage}
            pageCount={request.data?.data?.totalPages}
            page={page}
            onSingleRowSelection={(s) => {
              setSelected(s);
              setIsProviderDialog(true);
            }}
            loading={request.loading}
            endChildren={[
              <GridFilter
                handleChange={(v) => {
                  setstatus(v);
                }}
                options={LogOfServiceEnumOptions}
                selected={status}
              />,
            ]}
          ></ApiTable>
        </AppDataFetchingWrapper>
      </Box>
    </>
  );
}
