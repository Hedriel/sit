"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* 404 */}
        <h1 className="text-7xl font-bold tracking-tight text-blue-600">404</h1>

        {/* Message */}
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Página no encontrada
        </p>

        {/* Description */}
        <p className="max-w-sm text-sm text-zinc-400 dark:text-zinc-500">
          La página que buscás no existe o ha sido movida a otra ubicación.
        </p>

        {/* Action Button */}
        <div className="pt-6">
          <Button
            variant="flat"
            color="primary"
            as={Link}
            href="/"
            className="px-8 py-3 font-bold"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
