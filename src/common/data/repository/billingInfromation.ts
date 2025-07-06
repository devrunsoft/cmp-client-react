import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Client_URL } from "core/src/utils/url";
import { InfromationEntity } from "common/domain/entity/infromation_entity";

enum ApiType {
  getInfromation = "getInfromation",
  delete = "delete",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getInfromation]: (_: any) => `BilingInformation/Information`,
  [ApiType.delete]: (_: any) => `BilingInformation`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getInfromation]: "GET",
  [ApiType.delete]: "DELETE",
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

export function useGetInformation(): UseApiOutputType<InfromationEntity> {
  const config = getConfig(ApiType.getInfromation);
  return useApi<InfromationEntity>({
    ...config,
  });
}

export function useDeleteInformation(): UseApiOutputType<
  InfromationEntity,
  any
> {
  const config = getConfig(ApiType.delete);
  return useApi<InfromationEntity, any>({
    ...config,
  });
}
