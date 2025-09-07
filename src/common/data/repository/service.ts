import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import {
  BaseServiceAppointmentEntity,
  ClientServiceAppointment,
} from "common/domain/entity/service_appointment_entity";
import {
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";

enum ApiType {
  getAll = "ClientService",
  getAllByOpr = "getAllByOpr",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (queryPath: any) =>
    `ServiceAppointment/OperationalAddressPaginate/${queryPath}`,
  [ApiType.getAllByOpr]: (queryPath: any) =>
    `ServiceAppointment/OperationalAddress/${queryPath}`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
  [ApiType.getAllByOpr]: "GET",
};

const getConfig = (type: ApiType, queryPath?: any): AxiosRequestConfig => {
  const apiUrl = urls[type](queryPath);
  const config: AxiosRequestConfig = {
    url: apiUrl,
    method: method[type],
    baseURL: Api_URL,
  };
  return config;
};

export function useClientServiceGetAll(
  OperationalAddressId: number
): UseApiOutputType<
  PaginatedDataType<BaseServiceAppointmentEntity>,
  PaginationSearchParamsType
> {
  return useApi<
    PaginatedDataType<BaseServiceAppointmentEntity>,
    PaginationSearchParamsType
  >({
    ...getConfig(ApiType.getAll, OperationalAddressId),
  });
}

export function useGetAllServiceAppointmentApi(
  OperationalAddressId?: number
): UseApiOutputType<ClientServiceAppointment[], PaginationSearchParamsType> {
  return useApi<ClientServiceAppointment[], PaginationSearchParamsType>({
    ...getConfig(ApiType.getAllByOpr, OperationalAddressId),
  });
}
