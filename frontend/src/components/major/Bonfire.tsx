"use client";

import { useState } from "react";
import ChatInput from "../ChatInput";
import { Input } from "../ui/input";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import Message from "../Message";
import MessageLog from "../MessageLog";

export default function Bonfire() {
  const [chatInput, setChatInput] = useState("");

  const sampleMessages = [
    {
      user_id: 1,
      text: "Hello, how are you?",
      timestamp: "2023-08-12T10:00:00Z",
    },
    {
      user_id: 2,
      text: "I'm good, thanks! How about you?",
      timestamp: "2023-08-12T10:01:00Z",
    },
    {
      user_id: 1,
      text: "I'm also doing well, thanks for asking.",
      timestamp: "2023-08-12T10:02:00Z",
    },
    {
      user_id: 1,
      text: "Wanna fuck?",
      timestamp: "2023-08-12T10:03:00Z",
    },
    {
      user_id: 1,
      text: "like rn",
      timestamp: "2023-08-12T10:03:01Z",
    },
    {
      user_id: 2,
      text: "Wtf",
      timestamp: "2023-08-12T10:04:00Z",
    },
    {
      user_id: 1,
      text: "How about now?",
      timestamp: "2023-08-13T10:04:00Z",
    },
    {
      user_id: 2,
      text: "Lol no",
      timestamp: "2023-08-13T10:05:00Z",
    },
    {
      user_id: 2,
      text: "Creep",
      timestamp: "2023-08-13T10:06:00Z",
    },
  ];

  return (
    <div className="ml-2 mr-4 mb-10 justify-end flex h-screen flex-grow flex-col">
      <MessageLog messages={sampleMessages} />
      <ChatInput setChatInput={setChatInput} onSend={() => {}} />
    </div>
  );
}
