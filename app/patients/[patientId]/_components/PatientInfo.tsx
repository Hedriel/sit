"use client";

import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import { User, Mail, Phone, Calendar, CreditCard } from "lucide-react";
import { Patient } from "@/types";

export default function PatientInfo({ patient }: { patient: Patient }) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex gap-3 px-6 pt-6">
        <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
          <User className="text-primary" size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{patient.fullname}</p>
          <Chip size="sm" variant="flat" color="primary">
            Paciente
          </Chip>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4 px-6 py-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <CreditCard size={18} className="text-default-400" />
            <div>
              <p className="text-default-400 text-xs">DNI</p>
              <p className="text-sm font-medium">{patient.dni}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} className="text-default-400" />
            <div>
              <p className="text-default-400 text-xs">Teléfono</p>
              <p className="text-sm font-medium">{patient.phone || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={18} className="text-default-400" />
            <div>
              <p className="text-default-400 text-xs">Email</p>
              <p className="text-sm font-medium">{patient.email || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-default-400" />
            <div>
              <p className="text-default-400 text-xs">Fecha de Nacimiento</p>
              <p className="text-sm font-medium">
                {formatDate(patient.birth_date)}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
