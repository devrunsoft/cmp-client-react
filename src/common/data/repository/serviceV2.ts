import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { ServiceEntity } from "common/domain/entity/service_entity";

enum ApiType {
  getAll = "getAll",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (id: any) => `ServiceV2`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
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

export function useGetAllServiceApi(): UseApiOutputType<ServiceEntity[]> {
  return useApi<ServiceEntity[]>({
    ...getConfig(ApiType.getAll),
  });
}
