"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";
import { Pill } from "lucide-react";
import { Treatment } from "@/types";

export default function TreatmentsCard({
  treatments,
}: {
  treatments: Treatment[];
}) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const activeTreatments = treatments.filter((t) => t.active);
  const inactiveTreatments = treatments.filter((t) => !t.active);

  return (
    <Card>
      <CardHeader className="flex gap-3 px-6 pt-6">
        <div className="bg-success/10 flex h-10 w-10 items-center justify-center rounded-full">
          <Pill className="text-success" size={20} />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Tratamientos</p>
          <p className="text-default-400 text-sm">
            {activeTreatments.length} activo
            {activeTreatments.length !== 1 ? "s" : ""}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4 px-6 py-5">
        {treatments.length === 0 ? (
          <p className="text-default-400 py-4 text-center text-sm">
            No hay tratamientos registrados
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {activeTreatments.length > 0 && (
              <div className="flex flex-col gap-3">
                {activeTreatments.map((treatment) => (
                  <Card
                    key={treatment.id}
                    shadow="sm"
                    className="border-success/20 border"
                  >
                    <CardBody className="gap-2 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{treatment.medication}</p>
                        <Chip size="sm" color="success" variant="flat">
                          Activo
                        </Chip>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div>
                          <p className="text-default-400 text-xs">Dosis</p>
                          <p className="text-sm">{treatment.dosage}</p>
                        </div>
                        <div>
                          <p className="text-default-400 text-xs">Frecuencia</p>
                          <p className="text-sm">{treatment.frequency}</p>
                        </div>
                        <div>
                          <p className="text-default-400 text-xs">Desde</p>
                          <p className="text-sm">
                            {formatDate(treatment.start_date)}
                            {treatment.end_date
                              ? ` — ${formatDate(treatment.end_date)}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      {treatment.notes && (
                        <div className="mt-1">
                          <p className="text-default-400 text-xs">Notas</p>
                          <p className="text-sm">{treatment.notes}</p>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}

            {inactiveTreatments.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-default-500 text-xs font-semibold uppercase">
                  Finalizados
                </p>
                {inactiveTreatments.map((treatment) => (
                  <Card
                    key={treatment.id}
                    shadow="sm"
                    className="border-default-200 border opacity-70"
                  >
                    <CardBody className="gap-2 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{treatment.medication}</p>
                        <Chip size="sm" color="default" variant="flat">
                          Finalizado
                        </Chip>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div>
                          <p className="text-default-400 text-xs">Dosis</p>
                          <p className="text-sm">{treatment.dosage}</p>
                        </div>
                        <div>
                          <p className="text-default-400 text-xs">Frecuencia</p>
                          <p className="text-sm">{treatment.frequency}</p>
                        </div>
                        <div>
                          <p className="text-default-400 text-xs">Período</p>
                          <p className="text-sm">
                            {formatDate(treatment.start_date)} —{" "}
                            {formatDate(treatment.end_date)}
                          </p>
                        </div>
                      </div>
                      {treatment.notes && (
                        <div className="mt-1">
                          <p className="text-default-400 text-xs">Notas</p>
                          <p className="text-sm">{treatment.notes}</p>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
