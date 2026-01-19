"use client";

import { useActionState } from "react";
import { Form, Input, Button, Spinner } from "@heroui/react";
import { login } from "@/lib/auth/actions/login";

interface LoginFormProps {
  onForgotPasswordClick: () => void;
}

export default function LoginForm({ onForgotPasswordClick }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(login, undefined);
  return (
    <>
      <h1 className="mb-10 w-full text-center text-2xl font-bold">
        Iniciar Sesión
      </h1>
      <Form className="flex w-full max-w-xs flex-col" action={formAction}>
        <Input
          defaultValue={state?.fieldData?.username}
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
          className="text-primary hover:text-primary/80 mb-4 ml-auto cursor-pointer text-right text-xs transition-colors duration-300"
          onClick={onForgotPasswordClick}
        >
          Olvide mi contraseña
        </button>
        <Button
          isDisabled={isPending}
          color="primary"
          type="submit"
          className="w-full"
        >
          {isPending ? <Spinner size="sm" color="white" /> : "Iniciar sesión"}
        </Button>
      </Form>
      {state && (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}
    </>
  );
}
