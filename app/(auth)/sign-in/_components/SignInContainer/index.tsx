"use client";

import LoginForm from "../LoginForm";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SignInContainer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen max-h-[800px] w-full flex-col overflow-hidden lg:flex-row">
      {/* Left Side — Login Form */}
      <div className="mx-auto flex w-full max-w-1/2 flex-col justify-center bg-white px-8 py-12 lg:w-1/2 lg:px-20 dark:bg-zinc-950">
        {/* Logo */}
        <div className="mb-12 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.56 34.15V13.85c0 1.86-2.68 3.49-6.77 4.47a38.5 38.5 0 0 1-8.79.94 38.5 38.5 0 0 1-8.79-.94c-4.08-.98-6.76-2.61-6.76-4.47v20.3c0 1.85 2.68 3.49 6.76 4.46a38.5 38.5 0 0 0 8.79.95 38.5 38.5 0 0 0 8.79-.95c4.09-.97 6.77-2.61 6.77-4.46Z"
                  fill="currentColor"
                />
                <path
                  clipRule="evenodd"
                  d="M10.45 13.85c.03.08.17.39.93.88.92.6 2.37 1.18 4.29 1.64a36.5 36.5 0 0 0 8.33.9 36.5 36.5 0 0 0 8.33-.9 17.3 17.3 0 0 0 4.29-1.64c.76-.49.9-.8.93-.88a1.2 1.2 0 0 0-.49-.56c-.54-.44-1.43-.93-2.72-1.38C31.79 11.03 28.13 10.44 24 10.44s-7.79.59-10.34 1.47c-1.29.45-2.18.94-2.72 1.38a1.2 1.2 0 0 0-.49.56Zm27.11 4.94a22.4 22.4 0 0 1-4.3 1.48A40.5 40.5 0 0 1 24 21.27a40.5 40.5 0 0 1-9.26-1c-1.59-.38-3.06-.87-4.3-1.48v15.34c0 .03.1.36.94.89.92.59 2.37 1.18 4.29 1.64a36.5 36.5 0 0 0 8.33.9 36.5 36.5 0 0 0 8.33-.9c1.92-.46 3.37-1.05 4.29-1.64.84-.53.94-.86.94-.89V18.79Zm4 -4.93v20.29c0 1.96-1.4 3.36-2.76 4.24a20.3 20.3 0 0 1-5.53 2.17 40.5 40.5 0 0 1-9.27 1c-3.4 0-6.58-.36-9.26-1a20.3 20.3 0 0 1-5.53-2.17c-1.37-.88-2.77-2.28-2.77-4.24V13.85c0-1.59.93-2.81 1.95-3.65A18.7 18.7 0 0 1 12.34 8.14 40.5 40.5 0 0 1 24 6.44c4.46 0 8.58.63 11.66 1.7a18.7 18.7 0 0 1 3.94 2.06c1.02.84 1.96 2.06 1.96 3.65Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              SIT
            </span>
          </div>

          {/* Theme Switcher */}
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
            Bienvenido de vuelta
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400">
            Ingresá tus datos para acceder a tu cuenta.
          </p>
        </div>

        {/* LoginForm */}
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>

        {/* Footer links */}
        <div className="mt-auto flex gap-6 pt-10 text-xs text-zinc-400 dark:text-zinc-500">
          <a
            className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            href="#"
          >
            Política de Privacidad
          </a>
          <a
            className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            href="#"
          >
            Términos del Servicio
          </a>
        </div>
      </div>

      {/* Right Side — Hero Image (hidden on mobile) */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        {/* Background image */}
        <Image
          src="/images/login-bg.png"
          alt="Interior de clínica moderna"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />

        {/* Content over the image */}
        <div className="absolute inset-x-0 bottom-0 w-full max-w-2xl p-12 text-white lg:p-16">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Sistema Integral de Turnos
          </div>

          <h2 className="text-3xl leading-tight font-bold lg:text-4xl">
            Gestioná tu consultorio de forma simple y eficiente.
          </h2>
          <p className="mt-4 text-lg text-zinc-200">
            Turnos, pacientes y facturación en un solo lugar seguro.
          </p>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">500+</span>
              <span className="text-xs text-white/70">Clínicas activas</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">50k+</span>
              <span className="text-xs text-white/70">Turnos gestionados</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">4.9★</span>
              <span className="text-xs text-white/70">Calificación</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
