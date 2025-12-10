import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers";
import { ThemeSwitcher } from "../providers/UIProvider/ThemeSwitcher";
import LogOut from "@/components/auth/LogOutButton";

export const metadata: Metadata = {
  title: "Sistema Integral de Turnos",
  description: "Inicio de sesión",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased p-4 ">
        <Providers>
          <header className="flex justify-between items-center relative">
            <h1 className="text-2xl font-bold">Sistema Integral de Turnos</h1>
            <div className="flex gap-2">
              <LogOut />
              <ThemeSwitcher />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
