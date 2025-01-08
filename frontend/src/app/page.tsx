"use client";

import Image from "next/image";

export default function Home() {
  const ws = new WebSocket("ws://localhost:8000/api/v1/ws/global/");

  ws.onmessage = (event) => {
    console.log(JSON.parse(event.data));
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
        onClick={() => ws.send(JSON.stringify({
          user_id: 123,
          text: "Test message",
          timestamp: new Date()
        }))}
      />
    </div>
  );
}
