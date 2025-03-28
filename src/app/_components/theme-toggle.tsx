"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-fit w-fit border-0">
        <button className="relative">
          <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute left-0 top-0 h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileThemeToggle({ size = "sm" }: { size?: "sm" | "lg" }) {
  const { setTheme, theme } = useTheme();

  const handleThemechange = () => {
    if (theme === "system") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("system");
    }
  };

  const iconSize = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const textSize = size === "sm" ? "text-sm" : "text-xl font-extralight";
  const padding = size === "sm" ? "pl-2" : "pl-3";
  const gap = size === "sm" ? "gap-2" : "gap-3";
  const leftPosition = size === "sm" ? "left-2" : "left-3";

  return (
    <button
      onClick={handleThemechange}
      className={`relative flex h-fit w-full flex-row items-center justify-start ${gap} border-0 ${padding} ${textSize} `}
    >
      <SunIcon
        className={`${iconSize} rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
      />
      <MoonIcon
        className={`absolute ${leftPosition} top-0 ${iconSize} rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
      />
      <span className="capitalize">{theme}</span>
    </button>
  );
}
