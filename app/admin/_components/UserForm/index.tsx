"use client";
import { useActionState, useEffect } from "react";

import {
  Form,
  Input,
  Button,
  Spinner,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { createUser } from "@/lib/data-access-layer/admin/create-user";
export default function UserForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(createUser, undefined);

  useEffect(() => {
    if (state?.success) {
      onClose();
      addToast({
        title: "Usuario creado",
        description: "El usuario se ha creado correctamente",
        color: "success",
      });
    }
  }, [state?.success, onClose]);

  return (
    <>
      <Form action={formAction}>
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
          isRequired={!state?.success}
          label="Role"
          labelPlacement="outside"
          name="role"
          placeholder="Seleccione un rol"
        >
          <SelectItem key="doctor">Doctor</SelectItem>
          <SelectItem key="receptionist">Recepcionista</SelectItem>
          <SelectItem key="admin">Admin</SelectItem>
        </Select>
        <Input
          defaultValue={state?.fieldData?.password}
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
        <Button
          onPress={() => {
            onClose();
          }}
          color="primary"
          variant="light"
          className="w-full"
        >
          Cancelar
        </Button>
      </Form>
      {state && (
        <div className="text-center my-2">
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}
    </>
  );
}
