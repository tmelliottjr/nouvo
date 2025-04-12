"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="p-0 h-8 w-8 cursor-pointer"
    >
      {/* Show dark icon in light mode, light icon in dark mode */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-orange-400 dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all text-indigo-900 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">
        Toggle to {theme === "dark" ? "light" : "dark"} mode
      </span>
    </Button>
  );
}
