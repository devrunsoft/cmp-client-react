import React, { useEffect, useRef, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
  TypingIndicator,
} from "chat-ui-kit-react/components";
import {
  useChatMessageGetAll,
  useChatMessageSeen,
  useChatMessageSend,
} from "data/repository/chat/chatMessageApi";
import { connection } from "cmp-core/src/service/hub";
import {
  ChatMessageEntity,
  mapChatMessage,
} from "cmp-core/src/entity/chatMessage";
import { flushSync } from "react-dom";
import { useAppSelector } from "state/index";
import { ChatEnum } from "cmp-core/src/Enum/chat_enum";
import { getToken } from "core/src/utils/auth";
import { jwtDecode } from "jwt-decode";
import { AttachmentButton } from "chat-ui-kit-react/components/Buttons/AttachmentButton";
const receivedSound = new Audio("/sounds/message-received.mp3");
const sentSound = new Audio("/sounds/message-sent.mp3");

const formatFileSize = (bytes: number) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 10 ? 0 : 1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(mb >= 10 ? 1 : 2)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(gb >= 10 ? 1 : 2)} GB`;
};

const FloatingChat = () => {
  const refreshAddress = useAppSelector((state) => state.addressSlice);

  const requestGet = useChatMessageGetAll(refreshAddress.Id);
  const requestSend = useChatMessageSend(refreshAddress.Id);
  const requestSeen = useChatMessageSeen();
  const size = 10;

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loading = requestGet.loading;
  const refreshAddressRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([]);
    setPage(0);
    setHasMore(true);
    loadData(0, true);
    if (refreshAddress.Id) refreshAddressRef.current = refreshAddress.Id;
    clearSelectedFile();
  }, [refreshAddress.Id]);

  const [connectionLost, setConnectionLost] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    connection.on("SendMessage", (type: ChatEnum, message: string) => {
      if (type == ChatEnum.message) {
        onMessageType(type, message);
      } else if (type == ChatEnum.seen) {
        onSeenType(type, message);
      } else if (type == ChatEnum.isTyping) {
        onTyping(message);
      }
    });
  }, []);

  const onMessageType = (type: ChatEnum, message: string) => {
    const parsed: ChatMessageEntity = JSON.parse(message);
    if (refreshAddressRef.current != parsed.OperationalAddressId) return;
    var newMessage = mapChatMessage(parsed);
    requestSeen.call({
      data: {
        ChatMessageId: parsed.Id,
      },
    });
    receivedSound.play();
    setMessages((prev) => [...prev, newMessage]);
    offTyping();
  };

  const onSeenType = (type: ChatEnum, message: string) => {
    const parsed: ChatMessageEntity = JSON.parse(message);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.Id === parsed.Id ? { ...msg, status: "read" } : msg
      )
    );
  };

  useEffect(() => {
    const handleReconnect = () => {
      setConnectionLost(false);
      setReconnecting(false);
    };
    const handleReconnecting = () => {
      setConnectionLost(true);
      setReconnecting(true);
    };
    const handleDisconnected = () => {
      setConnectionLost(true);
      setReconnecting(false);
    };

    window.addEventListener("chat-reconnected", handleReconnect);
    window.addEventListener("chat-reconnecting", handleReconnecting);
    window.addEventListener("chat-disconnected", handleDisconnected);

    return () => {
      window.removeEventListener("chat-reconnected", handleReconnect);
      window.removeEventListener("chat-reconnecting", handleReconnecting);
      window.removeEventListener("chat-disconnected", handleDisconnected);
    };
  }, []);

  const [typingUsers, setTypingUsers] = useState<Record<string, number>>({});
  const lastTypingSentAtRef = useRef<number>(0);

  useEffect(() => {
    const i = setInterval(() => {
      const now = Date.now();
      setTypingUsers((prev) => {
        const next: Record<string, number> = {};
        let changed = false;
        for (const [name, expiry] of Object.entries(prev)) {
          if (expiry > now) next[name] = expiry;
          else changed = true;
        }
        return changed ? next : prev;
      });
    }, 800);
    return () => clearInterval(i);
  }, []);

  function personId(): string {
    try {
      var token = getToken();
      var decoded = jwtDecode(token?.token ?? "");
      var PersonId = decoded["PersonId"];
      return PersonId;
    } catch (error) {
      return "";
    }
  }
  function fullName(): string {
    try {
      var token = getToken();
      var decoded = jwtDecode(token?.token ?? "");
      var PersonId = decoded["FullName"];
      return PersonId;
    } catch (error) {
      return "";
    }
  }
  const onTyping = (message: string) => {
    try {
      const payload = JSON.parse(message) as {
        IsTyping: boolean;
        Name: string;
        PersonId: string;
        OperationalAddressId: number;
      };

      // only show typing for the active session
      const activeId = refreshAddress.Id;
      if (!activeId || payload.OperationalAddressId !== activeId) return;
      if (personId() == payload.PersonId) return;

      if (payload.IsTyping && payload.Name) {
        // set/refresh expiry to 3s from now
        setTypingUsers((prev) => ({
          ...prev,
          [payload.Name]: Date.now() + 3000,
        }));
      } else if (!payload.IsTyping && payload.Name) {
        setTypingUsers((prev) => {
          if (!(payload.Name in prev)) return prev;
          const { [payload.Name]: _, ...rest } = prev;
          return rest;
        });
      }
    } catch {
      /* ignore parse errors */
    }
  };

  const offTyping = () => {
    setTypingUsers({});
  };

  const isTyping = () => {
    const now = Date.now();
    if (now - lastTypingSentAtRef.current < 1000) return; // 1s throttle
    lastTypingSentAtRef.current = now;

    connection.invoke("ClientUserTyping", {
      OperationalAddressId: refreshAddress.Id,
      isTyping: true,
      name: `${fullName()}`.trim(),
    });
  };

  const loadData = (targetPage: number, hasMore) => {
    if (!hasMore || loading) return;

    const el = scrollRef.current;
    const prevHeight = el?.scrollHeight || 0;

    requestGet.call({
      params: { Size: size, Page: targetPage },
      onSuccess: (e) => {
        const data = e.data.elements;

        if (data.length < size) setHasMore(false);

        const formatted = data.map((m) => mapChatMessage(m)).reverse();

        setMessages((prev) => [...formatted, ...prev]);
        setPage((prev) => prev + 1);

        // Maintain scroll position after loading more
        setTimeout(() => {
          if (el) {
            const newHeight = el.scrollHeight;
            el.scrollTop = newHeight - prevHeight;
          }
        }, 100);
      },
    });
  };

  const send = (text: string, uniqueId: string) => {
    const { data, headers } = buildPayload(text, selectedFile);
    requestSend.call({
      data: data as any,
      headers,
      onSuccess(e) {
        console.log(`${text} ${uniqueId} A`);
        sentSound.play();

        // ✅ Update status to "sent" for the message with the matching ID
        setMessages((prev) =>
          prev.map((msg) =>
            msg.tempId === uniqueId
              ? { ...mapChatMessage(e.data), tempId: msg.tempId }
              : msg
          )
        );
        clearSelectedFile();
      },
      onError() {
        // ✅ Optional: Mark as error if sending failed
        setMessages((prev) =>
          prev.map((msg) =>
            msg.tempId === uniqueId ? { ...msg, status: "error" } : msg
          )
        );
      },
    });
  };
  useEffect(() => {
    if (selectedFile) {
      handleSend("file");
    }
  }, [selectedFile]);
  const handleSend = (text: string) => {
    if (requestSend.loading) return;
    const trimmed = text.trim();
    if (!trimmed && !selectedFile) return;
    const previewUrl =
      selectedFile && (filePreview || URL.createObjectURL(selectedFile));
    if (selectedFile && previewUrl && !filePreview) setFilePreview(previewUrl);
    const id = crypto.randomUUID();
    const newMessage = buildOutgoingMessage(
      trimmed,
      selectedFile,
      id,
      previewUrl || undefined
    );
    console.log(`${trimmed} ${id} B`);
    flushSync(() => {
      setMessages((prev) => [...prev, newMessage]);
    });

    send(trimmed, id);
  };

  const buildPayload = (text: string, file?: File | null) => {
    if (!file) return { data: { Message: text } };
    const form = new FormData();
    if (text) form.append("Message", text);
    form.append("File", file);
    return { data: form, headers: { "Content-Type": "multipart/form-data" } };
  };

  const buildOutgoingMessage = (
    text: string,
    file: File | null,
    tempId: string,
    previewUrl?: string
  ): MessageModel => {
    const base: MessageModel = {
      message: text || file?.name || "",
      sentTime: new Date().toLocaleTimeString(),
      sender: "You",
      direction: "outgoing",
      position: "single",
      tempId,
      status: "sending",
      type: "text",
      operationalAddressId: refreshAddress.Id,
    };

    if (!file) return base;

    const label = text || file.name;
    const preview = previewUrl || URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      return {
        ...base,
        message: label,
        type: "image",
        payload: { src: preview, alt: label, width: 260 },
      };
    }
    if (file.type.startsWith("video/")) {
      return {
        ...base,
        message: label,
        type: "custom",
        payload: (
          <div style={{ maxWidth: 360 }}>
            <video
              src={preview}
              controls
              style={{ width: "100%", borderRadius: 12 }}
            />
            {text && (
              <div style={{ marginTop: 6, fontSize: 13, color: "#444" }}>
                {text}
              </div>
            )}
          </div>
        ),
      };
    }
    if (file.type.startsWith("audio/")) {
      return {
        ...base,
        message: label,
        type: "custom",
        payload: (
          <div style={{ minWidth: 220 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
            <audio controls src={preview} style={{ width: "100%" }} />
          </div>
        ),
      };
    }

    return {
      ...base,
      message: label,
      type: "custom",
      payload: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #e5e5e5",
            background: "#f7f9fc",
            maxWidth: 360,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: "#0c4a87",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {file.name.split(".").pop()?.toUpperCase() || "FILE"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{file.name}</div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {formatFileSize(file.size)}
            </div>
          </div>
        </div>
      ),
    };
  };

  const handleFilePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (filePreview) URL.revokeObjectURL(filePreview);
    if (file) {
      const preview = URL.createObjectURL(file);
      setSelectedFile(file);
      setFilePreview(preview);
    } else {
      setSelectedFile(null);
      setFilePreview(null);
    }
    event.target.value = "";
  };

  const clearSelectedFile = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setSelectedFile(null);
    setFilePreview(null);
  };

  if (refreshAddress.Id == 0) return;
  const typingNames = Object.keys(typingUsers);
  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1299 }}>
      {connectionLost && (
        <div
          style={{
            backgroundColor: reconnecting ? "#FFF3CD" : "#F8D7DA",
            color: reconnecting ? "#856404" : "#721C24",
            padding: "10px 12px",
            textAlign: "center",
            fontSize: 14,
            fontWeight: 500,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {reconnecting ? (
            "Reconnecting to chat..."
          ) : (
            <>
              Disconnected from chat.
              <button
                style={{
                  marginLeft: 8,
                  color: "#721C24",
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  try {
                    await connection.start();
                    setConnectionLost(false);
                  } catch (err) {
                    console.error("Retry failed", err);
                  }
                }}
              >
                Retry
              </button>
            </>
          )}
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "#0C4A87",
            color: "#fff",
            borderRadius: "50%",
            width: 60,
            height: 60,
            fontSize: 28,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          💬
        </button>
      )}

      {open && (
        <div
          style={{
            width: 320,
            height: 500,
            backgroundColor: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#0C4A87",
              color: "#fff",
              padding: "10px 16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 16,
            }}
          >
            Conversion
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Chat body */}
          <div style={{ flexGrow: 1, overflowY: "auto" }} ref={scrollRef}>
            <MainContainer>
              <ChatContainer>
                <MessageList
                  typingIndicator={
                    typingNames.length > 0 && (
                      <TypingIndicator
                        content={`${typingNames.join(", ")} ${
                          typingNames.length > 1 ? "are" : "is"
                        } typing...`}
                      />
                    )
                  }
                  autoScrollToBottom={true}
                  onYReachStart={() => {
                    if (hasMore && !loading) {
                      loadData(page, hasMore);
                    }
                  }}
                  loadingMore={loading}
                  loadingMorePosition="top"
                >
                  {messages.map((m, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <Message model={m} />
                    </div>
                  ))}
                </MessageList>
                {selectedFile && (
                  <div
                    style={{
                      padding: "8px 10px",
                      background: "#f5f7fb",
                      borderTop: "1px solid #e5e5e5",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        background: "#0c4a87",
                        color: "white",
                        borderRadius: 6,
                        padding: "4px 8px",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {selectedFile.type.startsWith("image/")
                        ? "Image"
                        : selectedFile.type.startsWith("video/")
                        ? "Video"
                        : selectedFile.type.startsWith("audio/")
                        ? "Audio"
                        : "File"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>
                        {selectedFile.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#555" }}>
                        {formatFileSize(selectedFile.size)}
                      </div>
                    </div>
                    <button
                      onClick={clearSelectedFile}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#444",
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <MessageInput
                  placeholder="Type a message..."
                  onSend={handleSend}
                  onChange={isTyping}
                  attachButton
                  attachButtonComponent={
                    <AttachmentButton
                      child={
                        <input type="file" hidden onChange={handleFilePick} />
                      }
                    ></AttachmentButton>
                  }
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
