import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "@/app/globals.css";

import { Providers } from "@/providers";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Integral de Turnos",
  description: "Inicio de sesión",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${manrope.className} max-w-7xl mx-auto`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
