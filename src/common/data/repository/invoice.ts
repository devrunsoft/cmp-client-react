import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";

enum ApiType {
  get = "getByInvoiceNumber",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.get]: (id: any) => `Invoice/${id}`,
};

const method: Record<ApiType, Method> = {
  [ApiType.get]: "GET",
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
export function useInvoiceGet(
  invoiceNumber?: number
): UseApiOutputType<InvoiceEntity> {
  return useApi<InvoiceEntity>({
    ...getConfig(ApiType.get, invoiceNumber),
  });
}
