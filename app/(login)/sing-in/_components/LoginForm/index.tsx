"use client";

import { Form, Input, Button, Link } from "@heroui/react";
import { useState } from "react";

interface LoginFormProps {
  onForgotPasswordClick: () => void;
}

export default function LoginForm({ onForgotPasswordClick }: LoginFormProps) {
  const [action, setAction] = useState("");

  return (
    <>
      <h1 className="text-2xl font-bold text-center w-full mb-10">
        Iniciar Sesión
      </h1>
      <Form
        className="w-full max-w-xs flex flex-col "
        onReset={() => setAction("reset")}
      >
        <Input
          isRequired
          errorMessage="Ingrese un usuario valido"
          label="Usuario"
          labelPlacement="outside"
          name="username"
          placeholder="Ingrese su usuario"
          type="text"
          className="mb-4"
        />
        <Input
          isRequired
          errorMessage="Ingrese una contraseña valida"
          label="Contraseña"
          labelPlacement="outside"
          name="password"
          placeholder="Ingrese su contraseña"
          type="password"
        />
        <button
          type="button"
          className="text-xs text-primary ml-auto mb-4 text-right cursor-pointer hover:text-primary/80 transition-colors duration-300"
          onClick={onForgotPasswordClick}
        >
          Olvide mi contraseña
        </button>
        <Button color="primary" type="submit" className="w-full">
          Iniciar sesión
        </Button>
      </Form>
      <div className="flex gap-1 justify-center w-full pt-4">
        <span className="text-xs text-default-500 dark:text-white">
          No tienes una cuenta?
        </span>
        <Link href="/sing-up" className="text-xs text-primary">
          Registrarse
        </Link>
      </div>
    </>
  );
}
