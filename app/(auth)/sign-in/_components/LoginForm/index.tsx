"use client";

import { useActionState } from "react";
import { Form, Input, Button, Spinner } from "@heroui/react";
import { login } from "@/lib/auth/actions/login";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  return (
    <>
      <Form className="flex w-full flex-col gap-5" action={formAction}>
        <Input
          defaultValue={state?.fieldData?.username}
          isRequired
          errorMessage="Ingrese un correo valido"
          label="Correo"
          labelPlacement="outside"
          name="username"
          placeholder="doctor@clinica.com"
          type="email"
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

        <div className="flex w-full items-center justify-end">
          <a
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            href="#"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button
          isDisabled={isPending}
          color="primary"
          type="submit"
          className="mt-2 w-full font-bold"
          size="lg"
        >
          {isPending ? <Spinner size="sm" color="white" /> : "Iniciar sesión"}
        </Button>
      </Form>

      {state && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/30">
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.message}
          </p>
        </div>
      )}
    </>
  );
}
