import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import Link from "next/link";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Integral de Turnos",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${manrope.className} max-w-7xl mx-auto`}>
        <nav className="flex justify-between items-center p-4 h-16 bg-amber-800/20">
          <Link href="/sign-in">Iniciar sesión</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
