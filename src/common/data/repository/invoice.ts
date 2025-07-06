import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { Api_URL } from "core/src/utils/url";
import { InvoiceEntity } from "cmp-core/src/entity/InvoiceEntity";
import {
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";
import { TerminateContractCommand } from "common/domain/command/terminate_contract_command";
import { CancelRequestCommand } from "common/domain/command/cancel_request_command";

enum ApiType {
  get = "getByInvoiceNumber",
  pay = "pay",
  getAllRequest = "getAllRequest",
  getAllCreatedInvoice = "getAllCreatedInvoice",
  terminateContract = "terminateContract",
  useCancelRequest = "useCancelRequest",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.get]: (id: any) => `Invoice/${id}`,
  [ApiType.pay]: (id: any) => `Invoice/Pay/${id}`,
  [ApiType.getAllRequest]: (operationalAddressId: any) =>
    `/Invoice/Request/${operationalAddressId}`,
  [ApiType.getAllCreatedInvoice]: (operationalAddressId: number) =>
    `Invoice/OperationalAddress/${operationalAddressId}`,
  [ApiType.terminateContract]: (_) => `Invoice/TerminateContacrt`,
  [ApiType.useCancelRequest]: (_) => `Invoice/CancelRequest`,
};

const method: Record<ApiType, Method> = {
  [ApiType.get]: "GET",
  [ApiType.getAllRequest]: "GET",
  [ApiType.pay]: "POST",
  [ApiType.getAllCreatedInvoice]: "GET",
  [ApiType.terminateContract]: "POST",
  [ApiType.useCancelRequest]: "POST",
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

export function useInvoicRequestseGetAll(
  operationalAddressId: number
): UseApiOutputType<
  PaginatedDataType<InvoiceEntity>,
  PaginationSearchParamsType
> {
  return useApi<PaginatedDataType<InvoiceEntity>, PaginationSearchParamsType>({
    ...getConfig(ApiType.getAllRequest, operationalAddressId),
  });
}

export function useCreatedInvoiceGetAll(
  operationalAddressId: number
): UseApiOutputType<
  PaginatedDataType<InvoiceEntity>,
  PaginationSearchParamsType
> {
  return useApi<PaginatedDataType<InvoiceEntity>, PaginationSearchParamsType>({
    ...getConfig(ApiType.getAllCreatedInvoice, operationalAddressId),
  });
}

export function useTerminateContract(): UseApiOutputType<
  InvoiceEntity,
  TerminateContractCommand
> {
  return useApi<InvoiceEntity, TerminateContractCommand>({
    ...getConfig(ApiType.terminateContract),
  });
}

export function useCancelRequest(): UseApiOutputType<
  InvoiceEntity,
  CancelRequestCommand
> {
  return useApi<InvoiceEntity, CancelRequestCommand>({
    ...getConfig(ApiType.useCancelRequest),
  });
}
