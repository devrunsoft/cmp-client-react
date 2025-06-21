import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { ClientRepresentationEntity } from "common/domain/entity/client_representation_response";

enum CompanyApiType {
  GetAllRepresentation = "GetAllRepresentation",
}
const urls: Record<CompanyApiType, (queryPath?: any) => string> = {
  [CompanyApiType.GetAllRepresentation]: (OperationalAddressId: any) =>
    `ClientRepresentation/${OperationalAddressId}`,
};

const methods: Record<CompanyApiType, Method> = {
  [CompanyApiType.GetAllRepresentation]: "GET",
};

const getConfig = (
  type: CompanyApiType,
  queryPath?: any
): AxiosRequestConfig => ({
  url: urls[type](queryPath),
  method: methods[type],
  baseURL: Api_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// ⚡️ Custom Hook
export function useGetCompanyRepresentationApi(
  OperationalAddressId: number
): UseApiOutputType<ClientRepresentationEntity, void> {
  const config = getConfig(
    CompanyApiType.GetAllRepresentation,
    OperationalAddressId
  );
  return useApi<ClientRepresentationEntity, void>({
    ...config,
  });
}
