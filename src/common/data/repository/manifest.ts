import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import {
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";
import { ManifestEntity } from "cmp-core/src/entity/ManifestEntity";

enum ApiType {
  getAll = "getAll",
  get = "get",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (quey: any) => `ClientManifest/${quey}`,
  [ApiType.get]: (quey: any) => `ClientManifest/${quey}`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
  [ApiType.get]: "GET",
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

export function useClientManifestGetPaginate(
  OperationalAddressId: number
): UseApiOutputType<
  PaginatedDataType<ManifestEntity>,
  PaginationSearchParamsType
> {
  return useApi<PaginatedDataType<ManifestEntity>, PaginationSearchParamsType>({
    ...getConfig(ApiType.getAll, `OperationalAddress/${OperationalAddressId}`),
  });
}
export function useGetManifestAssign(
  OperationalAddressId?: number,
  Id?: number
): UseApiOutputType<ManifestEntity> {
  const config = getConfig(ApiType.get, `${OperationalAddressId}/${Id}`);
  return useApi<ManifestEntity>({
    ...config,
  });
}
