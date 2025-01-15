"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getQueueWebsocket } from "@/lib/api";
import { loggedInUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
        const data = JSON.parse(event.data);
        if (data.chat_room_id) {
          setPageState("chatting");
        }
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
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <span className="text-3xl font-bold">Chatting with a </span>
        <span className="text-3xl font-bold text-primary">random</span>
      </div>
    </div>
  );
}
