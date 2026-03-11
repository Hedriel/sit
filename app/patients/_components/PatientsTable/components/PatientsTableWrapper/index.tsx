"use client";

import { Eye } from "lucide-react";
import {
  TableCell,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  User as UserCard,
} from "@heroui/react";

import TopContent from "../TopContent";
import defaultProfile from "@/public/images/default-user.webp";
import { Patient } from "@/types";
import { usePatientFilter } from "@/hooks/usePatientFilter";
import { useRouter } from "next/navigation";

export default function PatientsTableWrapper({
  patients,
}: {
  patients: Patient[];
}) {
  const router = useRouter();
  const {
    filterValue,
    onSearchChange,
    onClear,
    filteredItems: filteredPatients,
  } = usePatientFilter(patients);

  return (
    <div className="pt-12">
      <Table
        isStriped
        aria-label="Tabla de pacientes"
        topContent={
          <TopContent
            filterValue={filterValue}
            onClear={onClear}
            onSearchChange={onSearchChange}
            patients={patients}
          />
        }
        topContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>PACIENTE</TableColumn>
          <TableColumn>DNI</TableColumn>
          <TableColumn>TELÉFONO</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn align="center">ACCIONES</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron pacientes"}
          items={filteredPatients}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="min-w-16">
                <UserCard
                  className="hidden sm:inline-flex"
                  avatarProps={{
                    radius: "lg",
                    src: defaultProfile.src,
                    name: item.fullname,
                  }}
                  name={item.fullname}
                />
                <div className="sm:hidden">
                  <p className="text-sm">{item.fullname}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm">{item.dni}</TableCell>
              <TableCell className="text-sm">
                {item.phone || "—"}
              </TableCell>
              <TableCell className="text-sm">
                {item.email || "—"}
              </TableCell>
              <TableCell>
                <div className="relative flex justify-center gap-2">
                  <Tooltip content="Ver detalle">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          router.push(`/patients/${item.id}`);
                        }
                      }}
                      onClick={() => router.push(`/patients/${item.id}`)}
                      className="text-primary cursor-pointer text-lg active:opacity-50"
                    >
                      <Eye size={18} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
