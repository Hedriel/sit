"use client";

import { Form, Input, Button, Link } from "@heroui/react";
import { login } from "../../actions/login";
import { useActionState } from "react";

interface LoginFormProps {
  onForgotPasswordClick: () => void;
}

export default function LoginForm({ onForgotPasswordClick }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(login, undefined);
  return (
    <>
      <h1 className="text-2xl font-bold text-center w-full mb-10">
        Iniciar Sesión
      </h1>
      <Form className="w-full max-w-xs flex flex-col " action={formAction}>
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
          className="text-xs text-primary ml-auto mb-4 text-right cursor-pointer hover:text-primary/80 transition-colors duration-300"
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
          Iniciar sesión
        </Button>
      </Form>
      {state && (
        <div className="text-center mt-4">
          <p className="text-xs text-red-600">{state.message}</p>
        </div>
      )}
      {/* <div className="flex gap-1 justify-center w-full pt-4">
        <span className="text-xs text-default-500 dark:text-white">
          No tienes una cuenta?
        </span>
        <Link href="/sing-up" className="text-xs text-primary">
          Registrarse
        </Link>
      </div> */}
    </>
  );
}
