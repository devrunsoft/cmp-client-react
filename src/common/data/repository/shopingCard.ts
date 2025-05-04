import useApi, { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { SignUpCommand } from "common/domain/command/signUpCommand";
import { TokenEntity } from "core/src/types/api";
import { AddShoppingCardCommand } from "common/domain/command/shopping_card/add";

enum AuthApiType {
  addShoppingCard = "addShoppingCard",
}

const urls: Record<AuthApiType, () => string> = {
  [AuthApiType.addShoppingCard]: () => `ShoppingCard`,
};

const method: Record<AuthApiType, Method> = {
  [AuthApiType.addShoppingCard]: "POST",
};

const getConfig = (type: AuthApiType): AxiosRequestConfig => {
  return {
    url: urls[type](),
    method: method[type],
    baseURL: Api_URL,
  };
};

export function useAddShoppingCard(): UseApiOutputType<TokenEntity, AddShoppingCardCommand> {
  const config = getConfig(AuthApiType.addShoppingCard);
  return useApi<TokenEntity, AddShoppingCardCommand>({
    ...config,
  });
}
