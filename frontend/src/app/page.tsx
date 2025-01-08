"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const ws = useRef<WebSocket>(null)

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/api/v1/ws/global/");

    ws.current.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };
  }, [])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
        onClick={() => ws.current!.send(JSON.stringify({
          user_id: 1,
          text: "Test message",
          timestamp: new Date()
        }))}
      />
    </div>
  );
}
