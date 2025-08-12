import useApi from "hooks/useApi";
import { UseApiOutputType } from "core/src/hooks/useApi";
import { AxiosRequestConfig, Method } from "axios";
import { BASE_URL, Client_URL } from "core/src/utils/url";
import { ChatMessageEntity } from "cmp-core/src/entity/chatMessage";
import {
  PaginatedDataType,
  PaginationSearchParamsType,
} from "core/src/types/api";
import { ChatMessageCommand } from "common/domain/command/chatMessageCommand";

enum ApiType {
  getAll = "getAll",
  send = "send",
  seen = "seen",
}

const urls: Record<ApiType, (queryPath?: any) => string> = {
  [ApiType.getAll]: (operationalAddressId: any) =>
    `ClientChatMessage/Messages/${operationalAddressId}`,
  [ApiType.send]: (operationalAddressId: any) =>
    `ClientChatMessage/Send/${operationalAddressId}`,
    [ApiType.seen]: (ChatMessageId: any) =>
    `ClientChatMessage/Seen`,
};

const method: Record<ApiType, Method> = {
  [ApiType.getAll]: "GET",
  [ApiType.send]: "POST",
  [ApiType.seen]: "POST",
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

export function useChatMessageGetAll(
  operationalAddressId?: number
): UseApiOutputType<
  PaginatedDataType<ChatMessageEntity>,
  PaginationSearchParamsType
> {
  return useApi<
    PaginatedDataType<ChatMessageEntity>,
    PaginationSearchParamsType
  >({
    ...getConfig(ApiType.getAll, operationalAddressId),
  });
}

export function useChatMessageSend(
  operationalAddressId?: number
): UseApiOutputType<ChatMessageEntity, ChatMessageCommand> {
  const config = getConfig(ApiType.send, operationalAddressId);
  return useApi<ChatMessageEntity, ChatMessageCommand>({
    ...config,
  });
}

export function useChatMessageSeen(
): UseApiOutputType<ChatMessageEntity, any> {
  const config = getConfig(ApiType.seen);
  return useApi<ChatMessageEntity, any>({
    ...config,
  });
}
