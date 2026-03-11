"use client";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { Patient } from "@/types";

export default function TopContent({
  filterValue,
  onClear,
  onSearchChange,
  patients,
}: {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  patients: Patient[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por nombre..."
          startContent={<Search />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-default-400 text-small">
          Total {patients.length} pacientes
        </span>
      </div>
    </div>
  );
}
