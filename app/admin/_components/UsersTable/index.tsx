"use client";

import { Trash2 } from "lucide-react";
import { addToast } from "@heroui/react";
import { Table, TableHeader, TableColumn, TableBody } from "@heroui/react";

import { renderBodyContent } from "./components/BodyContent";
import TopContent from "./components/TopContent";

import { User } from "./data";
import { deleteUser } from "@/lib/data-access-layer/admin/delete-user";
import { useUserFilter } from "@/hooks/useUserFilter";

export default function UsersTable({ users }: { users: User[] }) {
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
        {/* HeroUI TableBody expects a render function */}
        {(item) => renderBodyContent(item, handleDeleteUser)}
      </TableBody>
    </Table>
  );
}
