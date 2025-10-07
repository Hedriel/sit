import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";


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
    <html lang="en">
      <body
        className='antialiased'
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
