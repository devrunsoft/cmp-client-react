import React, { useEffect, useRef, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
} from "chat-ui-kit-react/components";
import {
  useChatMessageGetAll,
  useChatMessageSend,
} from "data/repository/chat/chatMessageApi";

const FloatingChat = () => {
  const requestGet = useChatMessageGetAll();
  const requestSend = useChatMessageSend();
  const size = 10;

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [open, setOpen] = useState(false);

  var scrollRef = useRef<HTMLDivElement>(null);
  const loading = requestGet.loading;

  useEffect(() => {
    if (open) {
      setMessages([]);
      setPage(0);
      setHasMore(true);
      loadData(0);
    }
  }, [open]);

  const loadData = (targetPage: number) => {
    if (!hasMore || loading) return;

    const el = scrollRef.current;
    const prevHeight = el?.scrollHeight || 0;

    requestGet.call({
      params: { Size: size, Page: targetPage },
      onSuccess: (e) => {
        const data = e.data.elements;

        if (data.length < size) setHasMore(false);

        const formatted = data
          .map((m) => ({
            message: m.Content,
            sentTime: new Date(m.SentAt).toLocaleTimeString(),
            sender: m.SenderType === "Client" ? "You" : m.SenderType,
            direction: m.SenderType === "Client" ? "outgoing" : "incoming",
            position: "single",
          }))
          .reverse();

        setMessages((prev) => [...formatted, ...prev]);
        setPage((prev) => prev + 1);

        // Maintain scroll position
        setTimeout(() => {
          if (el) {
            const newHeight = el.scrollHeight;
            el.scrollTop = newHeight - prevHeight;
          }
        }, 100);
      },
    });
  };

  const send = (text: string) => {
    requestSend.call({
      data: { Message: text },
      onSuccess: () => {},
    });
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage: MessageModel = {
      message: text,
      sentTime: new Date().toLocaleTimeString(),
      sender: "You",
      direction: "outgoing",
      position: "single",
    };

    setMessages((prev) => [...prev, newMessage]);
    send(text);

    // Scroll to bottom
    setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el && el.scrollTop === 0 && hasMore && !loading) {
      loadData(page);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
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
            CMP Chat
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

          {/* Chat body with scroll */}
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList
                  onYReachStart={(e) => {
                    scrollRef = e;
                    if (hasMore && !requestGet.loading) {
                      loadData(page);
                    }
                  }}
                  loadingMore={requestGet.loading}
                  loadingMorePosition="top"
                  autoScrollToBottom={true}
                  autoScrollToBottomOnMount={true}
                  style={{ overflowY: "auto", height: "100%" }}
                >
                  {messages.map((m, i) => (
                    <Message key={i} model={m} />
                  ))}
                </MessageList>
                <MessageInput
                  placeholder="Type a message..."
                  onSend={handleSend}
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
