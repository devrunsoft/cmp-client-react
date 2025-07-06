import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import {
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";
import { RequestTerminateEntity } from "cmp-core/src/entity/requestTerminate";

import { Client_URL } from "core/src/utils/url";
import { RequestTerminateCommand } from "common/domain/command/requestTerminateCommand";

enum ApiType {
  getAll = "getAll",
  post = "post",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (_: any) => `ClientRequestTerminate`,
  [ApiType.post]: (quey: any) => `ClientRequestTerminate`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
  [ApiType.post]: "POST",
};

const getConfig = (type: ApiType, queryPath?: any): AxiosRequestConfig => {
  const apiUrl = urls[type](queryPath);
  const config: AxiosRequestConfig = {
    url: apiUrl,
    method: method[type],
    baseURL: Client_URL,
  };
  return config;
};

export function useRequestTerminateGetAll(): UseApiOutputType<
  PaginatedDataType<RequestTerminateEntity>,
  PaginationSearchParamsType
> {
  return useApi<
    PaginatedDataType<RequestTerminateEntity>,
    PaginationSearchParamsType
  >({
    ...getConfig(ApiType.getAll),
  });
}

export function useRequestTerminate(): UseApiOutputType<
  RequestTerminateEntity,
  RequestTerminateCommand
> {
  const config = getConfig(ApiType.post);
  return useApi<RequestTerminateEntity, RequestTerminateCommand>({
    ...config,
  });
}
