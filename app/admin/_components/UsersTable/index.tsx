"use client";
// TODO: This is only a template. Table must be populated with data from the database.
// TODO: Javascript should be on own utils file.
// TODO: Icons should be on own utils file.
// TODO: Table schema should be adapted to user schema.

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
} from "@heroui/react";
import TopContent from "./components/TopContent";

import { User, statusColorMap } from "./data";

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
        <TableColumn>ACCIONES</TableColumn>
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
            <TableCell></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
