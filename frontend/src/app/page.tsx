"use client";

import { fakelogin, login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [id, setId] = useState<string>("");

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <span className="text-4xl font-bold">Welcome to Haribonfire!</span>
      <Input
        className="w-48 mt-4"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fakelogin(id)}
        placeholder="ID"
      />
      <Button className="mt-4" variant="outline"
        onClick={() => {
          fakelogin(id)
        }}
      >
        Log in with Microsoft
      </Button>
    </div>
  );
}
