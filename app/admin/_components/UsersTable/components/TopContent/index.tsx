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
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
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
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} usuarios
          </span>
        </div>
      </div>

      <Modal
        placement={isMobile ? "bottom" : "center"}
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Crear Usuario
          </ModalHeader>
          <ModalBody className="mx-auto w-full">
            <UserForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
