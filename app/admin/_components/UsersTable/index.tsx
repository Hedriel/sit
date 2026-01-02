"use client";

import { Trash2, PenLine } from "lucide-react";
import defaultProfile from "@/public/images/default-user.webp";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User as UserCard,
  Tooltip,
  addToast,
} from "@heroui/react";
import TopContent from "./components/TopContent";

import { User, statusColorMap } from "./data";
import { deleteUser } from "@/lib/data-access-layer/admin/delete-user";

export default function UsersTable({ users }: { users: User[] }) {
  const [filterValue, setFilterValue] = React.useState("");

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const filteredUsers = users.filter((user) => {
    return user.fullname.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <Table
      isStriped
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContentPlacement="outside"
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
        <TableColumn allowsSorting>ROL</TableColumn>
        <TableColumn align="center">ACCIONES</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={filteredUsers}>
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
              <div className="relative flex justify-center  gap-2 ">
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <PenLine size={18} />
                  </span>
                </Tooltip>

                <Tooltip color="danger" content="Delete user">
                  <span
                    onClick={() =>
                      deleteUser(item.id).then(({ success }) => {
                        success &&
                          addToast({
                            icon: <Trash2 size={18} />,
                            title: "Usuario eliminado",
                            description:
                              "El usuario se ha eliminado correctamente",
                            color: "success",
                          });
                      })
                    }
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
  );
}
