"use client";

import { Form, Input, Button } from "@heroui/react";

export default function ForgotPasswordForm() {
  return (
    <>
      <h1 className="mb-10 w-full text-center text-lg font-bold">
        Recuperar contraseña
      </h1>
      <Form className="mb-4 flex w-full max-w-xs flex-col">
        <Input
          isRequired
          errorMessage="Ingrese un email valido"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Ingrese su email"
          type="email"
        />
        <Button color="primary" type="submit" className="w-full">
          Recuperar contraseña
        </Button>
      </Form>
    </>
  );
}
