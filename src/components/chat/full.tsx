// FullChatPage.tsx
import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
} from "chat-ui-kit-react/components";
import { MessageModel } from "chat-ui-kit-react/types";

const FullChatPage = () => {
  const [activeContact, setActiveContact] = useState("Lilly");
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "Hi s!",
      sender: "Lilly",
      sentTime: "just now",
      direction: "incoming",
      position: "single",
    },
    {
      message: "I'm not really a bot 😄",
      sender: "Lilly",
      sentTime: "just now",
      direction: "incoming",
      position: "single",
    },
    {
      message:
        "but you can talk to me, without any consequences to test this awesome app",
      sender: "Lilly",
      sentTime: "just now",
      direction: "incoming",
      position: "single",
    },
    {
      message: "I will listen you patiently :)",
      sender: "Lilly",
      sentTime: "just now",
      direction: "incoming",
      position: "single",
    },
    {
      message: "Cheers!",
      sender: "Lilly",
      sentTime: "just now",
      direction: "incoming",
      position: "single",
    },
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        message: text,
        sender: "You",
        sentTime: new Date().toLocaleTimeString(),
        direction: "outgoing",
        position: "single",
      },
    ]);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MainContainer responsive>
        {/* Sidebar with contact list */}
        <Sidebar position="left" scrollable={false}>
          <ConversationList>
            <Conversation
              name="Alec"
              info="Talk to me..."
              active={activeContact === "Lilly"}
              onClick={() => setActiveContact("Lilly")}
            >
              <Avatar
                name="L"
                src="https://avatars.dicebear.com/api/initials/Lilly.svg"
              />
            </Conversation>

            <Conversation
              name="Mori"
              info="I'm a good listener"
              onClick={() => setActiveContact("Eliot")}
            >
              <Avatar
                name="E"
                src="https://avatars.dicebear.com/api/initials/Eliot.svg"
              />
            </Conversation>

            <Conversation
              name="[Bot] Leave feedback"
              info="Do you like this app?"
              onClick={() => setActiveContact("Feedback")}
            >
              <Avatar
                name="F"
                src="https://avatars.dicebear.com/api/initials/Feedback.svg"
              />
            </Conversation>

            <Conversation
              name="Martian"
              info="I am an alien life form"
              onClick={() => setActiveContact("Martian")}
            >
              <Avatar
                name="M"
                src="https://avatars.dicebear.com/api/initials/Martian.svg"
              />
            </Conversation>

            <Conversation
              name="Help"
              info="Be sure to see what's here..."
              onClick={() => setActiveContact("Help")}
            >
              <Avatar name="?" />
            </Conversation>

            <Conversation
              name="321313131"
              info="..."
              onClick={() => setActiveContact("Anon")}
            >
              <Avatar name="3" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        {/* Chat container */}
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              name={activeContact}
              src={`https://avatars.dicebear.com/api/initials/${activeContact}.svg`}
            />
            <ConversationHeader.Content
              userName={activeContact}
              info="Online"
            />
          </ConversationHeader>

          <MessageList>
            {messages.map((msg, i) => (
              <Message key={i} model={msg} />
            ))}
          </MessageList>

          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default FullChatPage;
