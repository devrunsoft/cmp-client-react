import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";

// Enum to represent your endpoints
enum ApiType {
  operationalAddressGetAll = "OperationalAddressDashboard/GetAll",
}

// Mapping the endpoint URL
const urls: Record<ApiType, () => string> = {
  [ApiType.operationalAddressGetAll]: () =>
    `OperationalAddressDashboard/GetAll`,
};

// Mapping HTTP methods
const method: Record<ApiType, Method> = {
  [ApiType.operationalAddressGetAll]: "GET",
};

// Axios config generator
const getConfig = (type: ApiType): AxiosRequestConfig => {
  const apiUrl = urls[type]();
  return {
    url: apiUrl,
    method: method[type],
    baseURL: Api_URL,
  };
};

// Your hook to use in components or services
export function useGetAllOperationalAddress(): UseApiOutputType<
  OperationalAddressEntity[],
  void
> {
  return useApi<OperationalAddressEntity[], void>({
    ...getConfig(ApiType.operationalAddressGetAll),
  });
}
