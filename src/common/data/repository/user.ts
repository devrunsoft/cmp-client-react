import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { LoginCommand } from "common/domain/command/login";

enum AuthApiType {
  login = "Login",
}

const urls: Record<AuthApiType, (queryPath?: string) => string> = {
  [AuthApiType.login]: () => `User/Login`,
};

const method: Record<AuthApiType, Method> = {
  [AuthApiType.login]: "POST",
};

const getConfig = (type: AuthApiType): AxiosRequestConfig => {
  return {
    url: urls[type](),
    method: method[type],
    baseURL: Api_URL,
    headers: {
      "Content-Type": "application/json-patch+json",
      Accept: "*/*",
    },
  };
};

export function useLoginApi(): UseApiOutputType<boolean, LoginCommand> {
  const config = getConfig(AuthApiType.login);
  return useApi<boolean, LoginCommand>({
    ...config,
  });
}
