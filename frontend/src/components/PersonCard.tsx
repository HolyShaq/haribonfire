"use client";

import Private from "@/components/major/Private"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PersonCardProps {
  avatar: string;
  name: string;
  course: string;
  setSelectedContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  i?: number;
}

export default function PersonCard({
  avatar,
  name,
  course,
  setSelectedContent,
  i = 0,
}: PersonCardProps) {
  return (
    <div
      className="mx-2 flex translate-y-[-25px] animate-slidein justify-between rounded-sm bg-neutral-300 p-1 opacity-0 hover:bg-stone-400 dark:bg-neutral-800 dark:hover:bg-stone-700"
      style={{
        animationDelay: `${i * 50}ms`,
      }}

      onClick={
        () => {
          setSelectedContent && setSelectedContent(<Private id={i} />)
        }
      }
    >
      <div className="flex items-center space-x-1">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs leading-none text-muted-foreground">{course}</p>
        </div>
      </div>
    </div>
  );
}
