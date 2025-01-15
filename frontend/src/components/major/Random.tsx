"use client";

import { Message, QueueResponse } from "@/common/interfaces";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getQueueWebsocket } from "@/lib/api";
import { loggedInUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MessageLog from "../MessageLog";
import ChatInput from "../ChatInput";

// Page States
type PageState = "start" | "matching" | "chatting";

export default function Random() {
  const [pageState, setPageState] = useState<PageState>("start");

  const pages = {
    start: <StartPage setPageState={setPageState} />,
    matching: <MatchingPage setPageState={setPageState} />,
    chatting: <ChattingPage setPageState={setPageState} />,
  };

  return pages[pageState];
}

interface PageProps {
  setPageState: (pageState: PageState) => void;
}

function StartPage({ setPageState }: PageProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <span className="text-3xl font-bold">Match with a </span>
        <span className="text-3xl font-bold text-primary">random</span>
        <span className="text-3xl font-bold"> Haribon!</span>
      </div>

      <div className="flex flex-row mt-6 items-center space-x-2">
        <Checkbox id="prefcourse" />
        <label htmlFor="prefcourse">Prefer same course</label>
      </div>

      <Button
        className="mt-3 bg-primary text-primary-foreground"
        variant="outline"
        onClick={() => setPageState("matching")}
      >
        Let's go!
      </Button>
    </div>
  );
}

function MatchingPage({ setPageState }: PageProps) {
  const ws = useRef<WebSocket>(null);
  const user = loggedInUser()!;
  useEffect(() => {
    if (ws.current == null) {
      ws.current = getQueueWebsocket(user.id!);
      ws.current.onmessage = (event) => {
        const data: QueueResponse = JSON.parse(event.data);
        if (data.chat_room_id) {
          setPageState("chatting");
        }
        ws.current!.close();
      };
    }
  }, []);

  return (
    <div className="flex flex-row justify-center items-center space-x-4">
      <Loader2 className="animate-spin" />
      <div>
        <span className="text-3xl font-bold">Matching with a </span>
        <span className="text-3xl font-bold text-primary">random</span>
        <span className="text-3xl font-bold"> Haribon...</span>
      </div>
    </div>
  );
}

function ChattingPage({ setPageState }: PageProps) {
  const user = loggedInUser()!;
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <div className="ml-2 mr-4 mb-10 justify-end flex h-screen flex-grow flex-col">
      <div className="text-muted-foreground mb-[-15px] ml-4">
        You've been matched with
        <span className="text-primary font-bold"> {user.name}</span>. Say hi :)
      </div>
      <MessageLog messages={messages} />
      <div className="flex flex-row space-x-2 w-full items-center">
        <Button
          className="bg-primary text-primary-foreground">
          Skip
        </Button>
        <ChatInput
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSend={() => {
            const messageData = {
              user_id: user.id!,
              user_name: user.name,
              text: chatInput,
              sent_at: new Date().toISOString(),
            };

            // Local append
            setMessages((prev) => [...prev, messageData]);

            // Broadcast message to websocket
            //ws.current?.send(JSON.stringify(messageData));
            setChatInput("");
          }}
        />
      </div>
    </div>
  );
}
