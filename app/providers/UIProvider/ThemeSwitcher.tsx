// app/components/ThemeSwitcher.tsx
"use client";
import "@theme-toggles/react/css/Classic.css";

import { useTheme } from "next-themes";
import { Classic } from "@theme-toggles/react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Classic
      className="text-4xl"
      toggled={theme === "dark"}
      toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      placeholder={theme === "dark" ? "Light Mode" : "Dark Mode"}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    />
  );
}
