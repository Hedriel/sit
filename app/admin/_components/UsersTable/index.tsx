"use client";
// TODO: This is only a template. Table must be populated with data from the database.
// TODO: Javascript should be on own utils file.
// TODO: Icons should be on own utils file.
// TODO: Table schema should be adapted to user schema.

import { EllipsisVertical } from "lucide-react";
import defaultProfile from "@/public/images/default-user.webp";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
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
            <TableCell>
              <UserCard
                avatarProps={{
                  radius: "lg",
                  src: item.avatar_url || defaultProfile.src,
                }}
                name={item.fullname}
              />
            </TableCell>
            <TableCell>{item.email}</TableCell>
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
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem key="delete">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
