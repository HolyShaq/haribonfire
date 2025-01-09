"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="group border-0 bg-neutral-200 hover:bg-primary dark:bg-stone-900 dark:hover:bg-primary dark:hover:text-primary-foreground"
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(theme == "light" ? "dark" : "light");
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-primary-foreground dark:text-primary transition-all group-hover:motion-preset-pulse-md dark:-rotate-90 dark:scale-0 dark:group-hover:text-primary-foreground" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-primary-foreground dark:text-primary transition-all group-hover:motion-preset-pulse-md dark:rotate-0 dark:scale-100 group-hover:text-primary-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
