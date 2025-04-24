import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";

enum CompanyApiType {
  GetAllRepresentation = "GetAllRepresentation",
}

const urls: Record<CompanyApiType, () => string> = {
  [CompanyApiType.GetAllRepresentation]: () => `ClientRepresentation`,
};

const methods: Record<CompanyApiType, Method> = {
  [CompanyApiType.GetAllRepresentation]: "GET",
};

const getConfig = (type: CompanyApiType): AxiosRequestConfig => ({
  url: urls[type](),
  method: methods[type],
  baseURL: Api_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// ⚡️ Custom Hook
export function useGetCompanyRepresentationApi(): UseApiOutputType<ClientRepresentationEntity, void> {
  const config = getConfig(CompanyApiType.GetAllRepresentation);
  return useApi<ClientRepresentationEntity, void>({
    ...config,
  });
}
