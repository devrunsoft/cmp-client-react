import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { BASE_URL, Client_URL } from "core/src/utils/url";
import { ChatMessageEntity } from "cmp-core/src/entity/chatMessage";
import { PaginatedDataType, PaginationSearchParamsType } from "core/src/types/api";
import { ChatMessageCommand } from "common/domain/command/chatMessageCommand";

enum ApiType {
  getAll = "getAll",
  send = "send",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (ClientId: any) => `ClientChatMessage/Messages`,
  [ApiType.send]: (ClientId: any) => `ClientChatMessage/Send`,

};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
  [ApiType.send]: "POST",

};

const getConfig = (type: ApiType, queryPath?: any): AxiosRequestConfig => {
  const apiUrl = urls[type](queryPath);
  const config: AxiosRequestConfig = {
    url: apiUrl,
    method: method[type],
    baseURL: Client_URL,
  };
  return config;
};

export function useChatMessageGetAll(): UseApiOutputType<
  PaginatedDataType<ChatMessageEntity>,
  PaginationSearchParamsType
> {
  return useApi<PaginatedDataType<ChatMessageEntity>, PaginationSearchParamsType>({
    ...getConfig(ApiType.getAll),
  });
}

export function useChatMessageSend(
  Id?: number
): UseApiOutputType<ChatMessageEntity, ChatMessageCommand> {
  const config = getConfig(ApiType.send, Id);
  return useApi<ChatMessageEntity, ChatMessageCommand>({
    ...config,
  });
}
