"use client";

import { Button, useDisclosure } from "@heroui/react";
import { ClipboardList, Pill } from "lucide-react";
import CreateConsultationModal from "./CreateConsultationModal";
import CreateTreatmentModal from "./CreateTreatmentModal";

export default function PatientActions({
  patientId,
  doctorId,
}: {
  patientId: string;
  doctorId: string;
}) {
  const {
    isOpen: isConsultationOpen,
    onOpen: onConsultationOpen,
    onOpenChange: onConsultationOpenChange,
    onClose: onConsultationClose,
  } = useDisclosure();

  const {
    isOpen: isTreatmentOpen,
    onOpen: onTreatmentOpen,
    onOpenChange: onTreatmentOpenChange,
    onClose: onTreatmentClose,
  } = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="primary"
          startContent={<ClipboardList size={18} />}
          onPress={onConsultationOpen}
        >
          Nueva Consulta
        </Button>
        <Button
          color="success"
          variant="flat"
          startContent={<Pill size={18} />}
          onPress={onTreatmentOpen}
        >
          Recetar Tratamiento
        </Button>
      </div>

      <CreateConsultationModal
        isOpen={isConsultationOpen}
        onOpenChange={onConsultationOpenChange}
        onClose={onConsultationClose}
        patientId={patientId}
        doctorId={doctorId}
      />

      <CreateTreatmentModal
        isOpen={isTreatmentOpen}
        onOpenChange={onTreatmentOpenChange}
        onClose={onTreatmentClose}
        patientId={patientId}
        doctorId={doctorId}
      />
    </>
  );
}
