"use client";

import { Form, Input, Button } from "@heroui/react";

export default function ForgotPasswordForm() {
  return (
    <>
      <h1 className="text-lg font-bold text-center w-full mb-10">
        Recuperar contraseña
      </h1>
      <Form className="w-full max-w-xs flex flex-col mb-4">
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
