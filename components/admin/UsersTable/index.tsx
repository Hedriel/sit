"use client";
// TODO: This is only a template. Table must be populated with data from the database.
// TODO: Javascript should be on own utils file.
// TODO: Icons should be on own utils file.
// TODO: Table schema should be adapted to user schema.

import type { Selection, SortDescriptor } from "@heroui/react";
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
import BottomContent from "./components/BottomContent";
import { User, columns, statusColorMap } from "./data";

export default function UsersTable({ users }: { users: User[] }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.first_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as any;
      const second = b[sortDescriptor.column as keyof User] as any;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={
        <BottomContent page={page} pages={pages} setPage={setPage} />
      }
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          filterValue={filterValue}
          onClear={onClear}
          onSearchChange={onSearchChange}
          onRowsPerPageChange={onRowsPerPageChange}
          users={users}
        />
      }
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        <TableColumn>USUARIO</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn allowsSorting>ROL</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>
              <UserCard
                avatarProps={{
                  radius: "lg",
                  src: item.avatar_url || defaultProfile.src,
                }}
                description={item.email}
                name={item.first_name + " " + item.last_name}
              >
                {item.email}
              </UserCard>
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
