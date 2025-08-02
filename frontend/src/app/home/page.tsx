"use client";

import Home from "@/components/major/Home";
import Sidebar from "@/components/Sidebar";
import { loggedInUser } from "@/lib/auth";
import { redirect, RedirectType, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatLayout() {
  const router = useRouter();
  const pathname = usePathname()
  const [selectedContent, setSelectedContent] = useState<React.ReactNode>(
    <Home />,
  );

  if (!loggedInUser()) {
    return redirect("/", RedirectType.replace);
  }

  // Clean up query params
  useEffect(() => {
    router.replace(pathname);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <div className="hidden md:block h-full">
        <Sidebar setSelectedContent={setSelectedContent} />
      </div>
      <div className="flex h-screen flex-grow items-center justify-center">
        {selectedContent}
      </div>
    </div>
  );
}
