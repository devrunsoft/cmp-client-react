import useApi from "hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { BASE_URL, Client_URL } from "core/src/utils/url";
import { PaginatedDataType, PaginationSearchParamsType } from "core/src/types/api";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";

enum ApiType {
  getAll = "getAll",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (_: any) => `CompanyContract`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
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

export function useCompanyContractGetAll(): UseApiOutputType<
  PaginatedDataType<CompanyContractEntity>,
  PaginationSearchParamsType
> {
  return useApi<
    PaginatedDataType<CompanyContractEntity>,
    PaginationSearchParamsType
  >({
    ...getConfig(ApiType.getAll),
  });
}
