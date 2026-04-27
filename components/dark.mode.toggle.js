"use client";

import Button from "@/components/button";
import { Moon, Sun } from "lucide-react";
import useDarkMode from "@/hooks/use-dark-mode";

export default function DarkModeToggle({ defaultMode = "dark" }) {
  const { theme, toggleTheme } = useDarkMode(defaultMode);

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
