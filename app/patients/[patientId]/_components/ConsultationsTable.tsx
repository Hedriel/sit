"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { ClipboardList } from "lucide-react";
import { Consultation } from "@/types";

export default function ConsultationsTable({
  consultations,
}: {
  consultations: Consultation[];
}) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader className="flex gap-3 px-6 pt-6">
        <div className="bg-warning/10 flex h-10 w-10 items-center justify-center rounded-full">
          <ClipboardList className="text-warning" size={20} />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Historial de Consultas</p>
          <p className="text-default-400 text-sm">
            {consultations.length} consulta
            {consultations.length !== 1 ? "s" : ""} registrada
            {consultations.length !== 1 ? "s" : ""}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="px-6 py-5">
        <Table
          isStriped
          aria-label="Historial de consultas"
          removeWrapper
        >
          <TableHeader>
            <TableColumn>FECHA</TableColumn>
            <TableColumn>DIAGNÓSTICO</TableColumn>
            <TableColumn>NOTAS</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No se encontraron consultas"}
            items={consultations}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className="min-w-[180px]">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">
                      {formatDate(item.date)}
                    </p>
                    <p className="text-default-400 text-xs">
                      {formatTime(item.date)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {item.diagnosis || "—"}
                </TableCell>
                <TableCell className="text-sm">
                  {item.notes || "—"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
