"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <span className="text-4xl font-bold">Welcome to Haribonfire!</span>
      <Button className="mt-4" variant="outline"
        onClick={() => {
          window.location.href = "/home/"
        }}
      >
        Log in with Microsoft
      </Button>
    </div>
  );
}
