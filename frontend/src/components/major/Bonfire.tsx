"use client";

import { useState } from "react";
import ChatInput from "../ChatInput";
import { Input } from "../ui/input";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

export default function Bonfire() {
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="ml-2 mr-4 mb-10 flex h-screen flex-grow flex-col">
      <div className="flex flex-grow flex-col-reverse items-end justify-start px-4"></div>
      <ChatInput setChatInput={setChatInput} onSend={() => {}} />
    </div>
  );
}
