import { GridDataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import ApiTable from "cmp-core/src/Datatable/ApiTable";
import TableDefinition from "./TableDefinition";
import useFilterData from "hooks/useFilterData";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Plus } from "lucide-react";

import { GridFilter } from "uikit/src/GridFilter";
import {
  BaseServiceAppointmentEntity,
  ServiceAppointmentEntity,
} from "common/domain/entity/service_appointment_entity";
import { useClientServiceGetAll } from "data/repository/service";
import { FILTER_INIT, PaginationSearchParamsType } from "core/src/types/api";
import {
  LogOfServiceEnum,
  LogOfServiceEnumOptions,
} from "cmp-core/src/Enum/logOfServiceEnum";
import { useAppSelector } from "state/index";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../routes/app_route";

export default function LogOfService() {
  const [selected, setSelected] =
    useState<Partial<BaseServiceAppointmentEntity> | null>(null);
  const [isProviderDialog, setIsProviderDialog] = useState<boolean>(false);
  const [status, setstatus] = useState<LogOfServiceEnum | null>(null);
  const refreshAddress = useAppSelector((state) => state.addressSlice);
  const request = useClientServiceGetAll(refreshAddress.Id ?? 0);
  const navigate = useNavigate();

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

  useEffect(() => {
    refresh();
  }, [refreshAddress.Id]);

  const { setFilter, setPage, refresh, page } =
    useFilterData<PaginationSearchParamsType>({
      initData: FILTER_INIT,
      handleFetchFn: loadData,
      autoFetch: false,
    });

  function onRoute(serviceappoitnment: BaseServiceAppointmentEntity) {
    navigate(
      `${APP_ROUTES.Enrollservice.replace(
        ":oprAddress",
        serviceappoitnment.Id?.toString() ?? ""
      )}?data=${serviceappoitnment.Id}&serviceId=${
        serviceappoitnment.ProductId
      }&type=${serviceappoitnment.Product?.Name}`,
      undefined
    );
  }

  return (
    <>
      <Box className="mainPadding">
        <GridDataFetchingWrapper retry={refresh} request={request}>
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
              onRoute(s);
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
        </GridDataFetchingWrapper>
      </Box>
    </>
  );
}
