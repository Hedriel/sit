import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import NavBar from "@/components/NavBar";
import { getUserProfile } from "@/lib/auth/user";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Integral de Turnos",
  description: "Inicio de sesión",
};

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getUserProfile();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${manrope.className} max-w-7xl mx-auto`}>
        <NavBar data={data} />
        {children}
      </body>
    </html>
  );
}
