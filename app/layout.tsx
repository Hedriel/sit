import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers";
import NavBar from "@/components/global/NavBar";

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
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
