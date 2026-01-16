import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NavBar from "@/components/NavBar";

import "./globals.css";
import { Providers } from "@/providers";
import { Suspense } from "react";
import NavBarSkeleton from "@/components/NavBar/_components/NavBarSkeleton";

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
      <body className={`antialiased ${manrope.className} max-w-7xl mx-auto`}>
        <Providers>
          <Suspense fallback={<NavBarSkeleton />}>
            <NavBar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
