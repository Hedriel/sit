import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { Providers } from "../providers";
import NavBar from "@/components/global/NavBar";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

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
      <body className={`antialiased p-4 ${manrope.className}`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
