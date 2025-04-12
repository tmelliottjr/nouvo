"use client";

import { Moon, Paintbrush, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="p-0 h-8 w-8">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Select theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 h-8 w-8 cursor-pointer"
        >
          {theme === "light" && (
            <Sun className="h-[1.2rem] w-[1.2rem] text-orange-400" />
          )}
          {theme === "dark" && (
            <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-900" />
          )}
          {theme === "night-owl" && (
            <Paintbrush className="h-[1.2rem] w-[1.2rem] text-[#82aaff]" />
          )}
          {theme === "system" && (
            <Sun className="h-[1.2rem] w-[1.2rem] text-orange-400" />
          )}
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2 text-orange-400" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2 text-indigo-900" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("night-owl")}>
          <Paintbrush className="h-4 w-4 mr-2 text-[#82aaff]" />
          <span>Night Owl</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
