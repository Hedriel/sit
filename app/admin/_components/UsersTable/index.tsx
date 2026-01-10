"use client";

import { PenLine, Trash2 } from "lucide-react";
import { addToast, Chip, TableCell, Tooltip } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  User as UserCard,
  useDisclosure,
} from "@heroui/react";

import TopContent from "./components/TopContent";
import defaultProfile from "@/public/images/default-user.webp";

import { User } from "@/types";
import { deleteUser } from "@/lib/data-access-layer/admin/delete-user";
import { useUserFilter } from "@/hooks/useUserFilter";
import { statusColorMap } from "./data";
import UserForm from "../UserForm";
import { useState } from "react";
export default function UsersTable({ users }: { users: User[] }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {
    filterValue,
    onSearchChange,
    onClear,
    filteredItems: filteredUsers,
  } = useUserFilter(users);

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId).then(({ success }) => {
      success &&
        addToast({
          icon: <Trash2 size={18} />,
          title: "Usuario eliminado",
          description: "El usuario se ha eliminado correctamente",
          color: "success",
        });
    });
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
                <>
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
                </>
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
                      onClick={() => {
                        setSelectedUser(item);
                        onOpen();
                      }}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <PenLine size={18} />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar Usuario">
                    <span
                      onClick={() => handleDeleteUser(item.id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
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
    </>
  );
}
