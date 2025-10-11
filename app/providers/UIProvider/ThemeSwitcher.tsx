// app/components/ThemeSwitcher.tsx
"use client";
import "@theme-toggles/react/css/Classic.css";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Classic } from "@theme-toggles/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
