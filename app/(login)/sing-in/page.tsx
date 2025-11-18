"use client";
import { Button, Input, Card, Link } from "@heroui/react";
import { useState } from "react";
import { Form } from "@heroui/react";

export default function SingInPage() {
  const [action, setAction] = useState("");
  return (
    <div className="flex justify-center items-center min-w-full">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-xs">
        <div className="flex flex-col mb-8">
          <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        </div>
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          onReset={() => setAction("reset")}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   let data = Object.fromEntries(new FormData(e.currentTarget));

          //   setAction(`submit ${JSON.stringify(data)}`);
          // }}
        >
          <Input
            className=""
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
            name="email"
            placeholder="Ingrese su contraseña"
            type="password"
          />

          <Button color="primary" type="submit" className="w-full">
            Iniciar sesión
          </Button>

          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
}
