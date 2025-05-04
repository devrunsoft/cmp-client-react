import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { LoginCommand } from "common/domain/command/login";
import { TokenEntity } from "core/src/types/api";

enum AuthApiType {
  get = "get",
}

const urls: Record<AuthApiType, (queryPath?: string) => string> = {
  [AuthApiType.get]: () => `ClientTermsConditions`,
};

const method: Record<AuthApiType, Method> = {
  [AuthApiType.get]: "GET",
};

const getConfig = (type: AuthApiType): AxiosRequestConfig => {
  return {
    url: urls[type](),
    method: method[type],
    baseURL: Api_URL,
  };
};

export function useTermsAndCondition(): UseApiOutputType<String> {
  const config = getConfig(AuthApiType.get);
  return useApi<String>({
    ...config,
    tokenRequired: false,
  });
}
