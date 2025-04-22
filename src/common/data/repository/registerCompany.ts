import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { SignUpCommand } from "common/domain/command/signUpCommand";
import { TokenEntity } from "core/src/types/api";

enum AuthApiType {
  signUp = "RegisterCompany",
}

const urls: Record<AuthApiType, () => string> = {
  [AuthApiType.signUp]: () => `RegisterCompany`,
};

const method: Record<AuthApiType, Method> = {
  [AuthApiType.signUp]: "POST",
};

const getConfig = (type: AuthApiType): AxiosRequestConfig => {
  return {
    url: urls[type](),
    method: method[type],
    baseURL: Api_URL,
  };
};

export function useSignUpApi(): UseApiOutputType<TokenEntity, SignUpCommand> {
  const config = getConfig(AuthApiType.signUp);
  return useApi<TokenEntity, SignUpCommand>({
    ...config,
    tokenRequired: false,
  });
}
