"use client";
import { useActionState, useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Spinner,
  Select,
  SelectItem,
  addToast,
  ModalContent,
  ModalHeader,
  Modal,
  ModalBody,
} from "@heroui/react";

import { createUser } from "@/lib/data-access-layer/admin/create-user";
import { editUser } from "@/lib/data-access-layer/admin/edit-user";
import AvatarUpload from "../AvatarUpload";
import { useIsMobile } from "@/hooks/useIsMobile";
import { User } from "@/types";
import { Eye, EyeOff } from "lucide-react";
export default function UserForm({
  onClose,
  isOpen,
  onOpenChange,
  isEdit,
  data,
}: {
  onClose: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  data?: User;
}) {
  const [state, formAction, isPending] = useActionState(
    isEdit ? editUser : createUser,
    undefined
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (state?.success) {
      addToast({
        title: isEdit ? "Usuario editado" : "Usuario creado",
        description: isEdit
          ? "El usuario se ha editado correctamente"
          : "El usuario se ha creado correctamente",
        color: "success",
      });
      onClose();
    }
  }, [state?.success, onClose]);

  return (
    <>
      <Modal
        size={isMobile ? "full" : "lg"}
        placement={isMobile ? "top" : "center"}
        scrollBehavior="normal"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isEdit ? "Editar Usuario" : "Crear Usuario"}
          </ModalHeader>
          <ModalBody className="mx-auto w-full">
            <Form action={formAction}>
              {isEdit && <input hidden defaultValue={data?.id} name="id" />}
              <Input
                defaultValue={state?.fieldData?.first_name || data?.first_name}
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
                defaultValue={state?.fieldData?.last_name || data?.last_name}
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
                defaultSelectedKeys={data?.role && [data.role]}
                className="mt-5"
                isRequired={!state?.success}
                label="Rol"
                labelPlacement="outside"
                name="role"
                placeholder="Seleccione un rol"
                required
              >
                <SelectItem key="doctor">Doctor</SelectItem>
                <SelectItem key="receptionist">Recepcionista</SelectItem>
                <SelectItem key="admin">Admin</SelectItem>
              </Select>
              <Input
                defaultValue={state?.fieldData?.email || data?.email}
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
                isRequired={!data}
                errorMessage="Ingrese una contraseña valida"
                label="Contraseña"
                labelPlacement="outside"
                name="password"
                placeholder="Ingrese su contraseña"
                endContent={
                  isPasswordVisible ? (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  )
                }
                type={isPasswordVisible ? "text" : "password"}
              />
              <AvatarUpload />
              <Button
                isDisabled={isPending}
                color="primary"
                type="submit"
                className="w-full"
              >
                {isPending ? (
                  <Spinner size="sm" color="white" />
                ) : data ? (
                  "Editar usuario"
                ) : (
                  "Crear usuario"
                )}
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
          </ModalBody>
        </ModalContent>
      </Modal>
      {state && (
        <div className="text-center my-2">
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}
    </>
  );
}
