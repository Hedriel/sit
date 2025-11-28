"use client";

import { Form, Input, Button, Link, Card } from "@heroui/react";
import { register } from "../../actions/register";

export default function RegisterForm() {
  return (
    <Card className="p-4 w-full max-w-xs">
      <h1 className="text-2xl font-bold text-center w-full mb-10">
        Registrarse
      </h1>
      <Form action={register} className="w-full max-w-xs flex flex-col ">
        <Input
          isRequired
          errorMessage="Ingrese un usuario valido"
          label="Usuario"
          labelPlacement="outside"
          name="username"
          placeholder="Ingrese su usuario"
          type="text"
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
        <Button color="primary" type="submit" className="w-full">
          Registrarse
        </Button>
      </Form>
      <div className="flex gap-1 justify-center w-full pt-4">
        <span className="text-xs text-default-500 dark:text-white">
          Ya tienes una cuenta?
        </span>
        <Link href="/sing-in" className="text-xs text-primary">
          Iniciar sesión
        </Link>
      </div>
    </Card>
  );
}
