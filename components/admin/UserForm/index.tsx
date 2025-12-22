"use client";
import { useActionState } from "react";
import {
  Form,
  Input,
  Button,
  Spinner,
  Select,
  SelectItem,
  Card,
} from "@heroui/react";
import { createUser } from "@/lib/data-access-layer/admin/create-user";
export default function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, undefined);
  return (
    <Card className="items-center justify-center mx-auto min-w-md p-12  mt-20 h-fit">
      <h1 className="text-2xl font-bold text-center  ">Crear Usuario</h1>
      <Form className="w-full max-w-xs flex flex-col " action={formAction}>
        <Input
          defaultValue={state?.fieldData?.email}
          isRequired
          errorMessage="Ingrese un correo valido"
          label="Correo"
          labelPlacement="outside"
          name="email"
          placeholder="Ingrese su correo"
          type="email"
          className="mb-4"
        />
        <Input
          defaultValue={state?.fieldData?.first_name}
          isRequired
          errorMessage="Ingrese un nombre valido"
          label="Nombre"
          labelPlacement="outside"
          name="first_name"
          placeholder="Ingrese su nombre"
          type="text"
          className="mb-4"
        />
        <Input
          defaultValue={state?.fieldData?.last_name}
          isRequired
          errorMessage="Ingrese un apellido valido"
          label="Apellido"
          labelPlacement="outside"
          name="last_name"
          placeholder="Ingrese su apellido"
          type="text"
          className="mb-4"
        />

        <Select
          className="mt-5"
          isRequired
          label="Role"
          labelPlacement="outside"
          name="role"
          placeholder="Seleccione un rol"
        >
          <SelectItem key="doctor">Doctor</SelectItem>
          <SelectItem key="receptionist">Recepcionista</SelectItem>
        </Select>
        <Input
          isRequired
          errorMessage="Ingrese una contraseña valida"
          label="Contraseña"
          labelPlacement="outside"
          name="password"
          placeholder="Ingrese su contraseña"
          type="password"
        />
        <Button
          isDisabled={isPending}
          color="primary"
          type="submit"
          className="w-full"
        >
          {isPending ? <Spinner size="sm" color="white" /> : "Crear usuario"}
        </Button>
      </Form>
      {state && (
        <div className="text-center mt-4">
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}
    </Card>
  );
}
