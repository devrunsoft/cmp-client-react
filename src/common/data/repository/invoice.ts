import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import {
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";

enum ApiType {
  get = "getByInvoiceNumber",
  pay = "pay",
  getAllRequest = "getAllRequest",
  getAllCreatedInvoice = "getAllCreatedInvoice",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.get]: (id: any) => `Invoice/${id}`,
  [ApiType.pay]: (id: any) => `Invoice/Pay/${id}`,
  [ApiType.getAllRequest]: (id: any) => `/Invoice/Request`,
  [ApiType.getAllCreatedInvoice]: (id: number) => `Invoice`,
};

const method: Record<ApiType, Method> = {
  [ApiType.get]: "GET",
  [ApiType.getAllRequest]: "GET",
  [ApiType.pay]: "POST",
  [ApiType.getAllCreatedInvoice]: "GET",
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

export function useInvoicePay(
  invoiceNumber?: number
): UseApiOutputType<string> {
  return useApi<string>({
    ...getConfig(ApiType.pay, invoiceNumber),
  });
}

export function useInvoicRequestseGetAll(): UseApiOutputType<
  PaginatedDataType<InvoiceEntity>,
  PaginationSearchParamsType
> {
  return useApi<PaginatedDataType<InvoiceEntity>, PaginationSearchParamsType>({
    ...getConfig(ApiType.getAllRequest),
  });
}

export function useCreatedInvoiceGetAll(): UseApiOutputType<
  PaginatedDataType<InvoiceEntity>,
  PaginationSearchParamsType
> {
  return useApi<PaginatedDataType<InvoiceEntity>, PaginationSearchParamsType>({
    ...getConfig(ApiType.getAllCreatedInvoice),
  });
}
