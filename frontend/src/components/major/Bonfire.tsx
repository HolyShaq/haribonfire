"use client";

import { useEffect, useState } from "react";
import ChatInput from "../ChatInput";
import { Input } from "../ui/input";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import MessageLog from "../MessageLog";
import { Message } from "@/common/interfaces";

export default function Bonfire({ id, name }: { id: number; name: string }) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // TODO: Will be an API call
    setMessages([]);
  }, []);

  return (
    <div className="ml-2 mr-4 mb-10 justify-end flex h-screen flex-grow flex-col">
      <MessageLog messages={messages} />
      <ChatInput
        chatInput={chatInput}
        setChatInput={setChatInput}
        onSend={() => {
          setMessages((prev) => [
            ...prev,
            {
              user_id: id,
              user_name: name,
              text: chatInput,
              timestamp: new Date().toISOString(),
            },
          ]);
          setChatInput("");
        }}
      />
    </div>
  );
}
