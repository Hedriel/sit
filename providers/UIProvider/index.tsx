"use client";

import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function UIProvider({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
