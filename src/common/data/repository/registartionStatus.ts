import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";

enum AuthApiType {
  registrationStatus = "RegisterStatus/RegistartionStatusLogin",
}

const urls: Record<AuthApiType, () => string> = {
  [AuthApiType.registrationStatus]: () => `RegisterStatus/RegistartionStatusLogin`,
};

const method: Record<AuthApiType, Method> = {
  [AuthApiType.registrationStatus]: "GET",
};

const getConfig = (type: AuthApiType): AxiosRequestConfig => {
  return {
    url: urls[type](),
    method: method[type],
    baseURL: Api_URL,
  };
};

export function useRegistartionStatusLogin(): UseApiOutputType<string> {
  return useApi<string>({
    ...getConfig(AuthApiType.registrationStatus),
  });
}
