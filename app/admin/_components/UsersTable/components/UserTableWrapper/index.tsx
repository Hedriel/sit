"use client";

import { PenLine, Trash2 } from "lucide-react";
import {
  addToast,
  Chip,
  TableCell,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  User as UserCard,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import TopContent from "../../components/TopContent";
import defaultProfile from "@/public/images/default-user.webp";

import { User } from "@/types";
import { deleteUser } from "@/lib/data-access-layer/admin/delete-user";
import { useUserFilter } from "@/hooks/useUserFilter";
import { statusColorMap } from "../../data";
import UserForm from "../../../UserForm";
import { useState } from "react";
export default function UsersTableWrapper({ users }: { users: User[] }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const {
    filterValue,
    onSearchChange,
    onClear,
    filteredItems: filteredUsers,
  } = useUserFilter(users);

  const handleDeleteUser = async (userId: string) => {
    try {
      const { success } = await deleteUser(userId);
      if (success) {
        addToast({
          title: "Usuario eliminado",
          description: "El usuario se ha eliminado correctamente",
          color: "success",
        });
      } else {
        addToast({
          title: "Error",
          description: "No se pudo eliminar el usuario",
          color: "danger",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      addToast({
        title: "Error inesperado",
        description: "Intenta nuevamente",
        color: "danger",
      });
    } finally {
      onDeleteClose();
      setUserToDelete(null);
    }
  };

  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
    onDeleteOpen();
  };

  return (
    <>
      <Table
        isStriped
        aria-label="Tabla de usuarios"
        topContent={
          <TopContent
            filterValue={filterValue}
            onClear={onClear}
            onSearchChange={onSearchChange}
            users={users}
          />
        }
        topContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>USUARIO</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROL</TableColumn>
          <TableColumn align="center">ACCIONES</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron usuarios"}
          items={filteredUsers}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="min-w-16">
                <UserCard
                  className="hidden sm:inline-flex"
                  avatarProps={{
                    radius: "lg",
                    src: item.avatar_url || defaultProfile.src,
                  }}
                  name={item.fullname}
                />
                <div className="sm:hidden">
                  <p className="text-sm">{item.fullname}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm">{item.email}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[item.role]}
                  size="sm"
                  variant="flat"
                >
                  {item.role}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex justify-center gap-2">
                  <Tooltip content="Editar Usuario">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedUser(item);
                          onOpen();
                        }
                      }}
                      onClick={() => {
                        setSelectedUser(item);
                        onOpen();
                      }}
                      className="text-default-400 cursor-pointer text-lg active:opacity-50"
                    >
                      <PenLine size={18} />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar Usuario">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          confirmDelete(item.id);
                        }
                      }}
                      onClick={() => confirmDelete(item.id)}
                      className="text-danger cursor-pointer text-lg active:opacity-50"
                    >
                      <Trash2 size={18} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserForm
          data={selectedUser}
          isEdit
          onClose={() => {
            onClose();
            setSelectedUser(null);
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar eliminación
              </ModalHeader>
              <ModalBody>
                <p>
                  ¿Estás seguro de que deseas eliminar este usuario? Esta acción
                  no se puede deshacer.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={() =>
                    userToDelete && handleDeleteUser(userToDelete)
                  }
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
