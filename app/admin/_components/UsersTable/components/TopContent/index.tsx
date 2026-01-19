"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { PlusIcon, Search } from "lucide-react";
import { User } from "@/types";
import UserForm from "../../../UserForm";

export default function TopContent({
  filterValue,
  onClear,
  onSearchChange,
  users,
}: {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  users: User[];
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              onPress={() => onOpen()}
              color="primary"
              endContent={<PlusIcon size={22} />}
            >
              Agregar Usuario
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {users.length} usuarios
          </span>
        </div>
      </div>

      <UserForm onClose={onClose} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
