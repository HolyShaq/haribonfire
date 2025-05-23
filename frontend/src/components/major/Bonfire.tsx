"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "../ChatInput";
import MessageLog from "../MessageLog";
import { getGlobalMessages, getGlobalWebsocket } from "@/lib/api";
import { Message } from "@/common/interfaces";
import { loggedInUser } from "@/lib/auth";

export default function Bonfire() {
  const user = loggedInUser()!;
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket>(null);

  useEffect(() => {
    // Initialize websocket connection
    if (ws.current == null) {
      ws.current = getGlobalWebsocket();
      ws.current.onmessage = (event) => {
        const data: Message = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      }
    }

    // Fetch global messages
    getGlobalMessages().then((data) => {
      setMessages(data);
    });
  }, []);

  return (
    <div className="ml-2 mr-4 mb-10 justify-end flex h-screen flex-grow flex-col">
      <MessageLog messages={messages} />
      <ChatInput
        chatInput={chatInput}
        setChatInput={setChatInput}
        onSend={() => {
          const messageData = {
            user_id: user.id!,
            user_name: user.name,
            avatar_seed: user.avatar_seed,
            text: chatInput,
            sent_at: new Date().toISOString(),
          };

          // Local append
          setMessages((prev) => [...prev, messageData]);

          // Broadcast message to websocket
          ws.current?.send(JSON.stringify(messageData));
          setChatInput("");
        }}
      />
    </div>
  );
}
