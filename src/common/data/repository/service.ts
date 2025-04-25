import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { BaseServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";

enum ApiType {
  getAll = "ClientService",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (queryPath: any) => `ServiceAppointment`,
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

export function useClientServiceGetAll(
): UseApiOutputType<BaseServiceAppointmentEntity[]> {
  return useApi<BaseServiceAppointmentEntity[]>({
    ...getConfig(ApiType.getAll),
  });
}
