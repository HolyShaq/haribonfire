"use client";

import Image from "next/image";

export default function Home() {
  const ws = new WebSocket("ws://localhost:8000/api/v1/ws/global/");

  ws.onmessage = (event) => {
    console.log("Received: ", event.data);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
        onClick={() => ws.send("Hello")}
      />
    </div>
  );
}
