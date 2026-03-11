"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import { createConsultation } from "@/lib/data-access-layer/patients/consultation-actions";

export default function CreateConsultationModal({
  isOpen,
  onOpenChange,
  onClose,
  patientId,
  doctorId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  patientId: string;
  doctorId: string;
}) {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setDiagnosis("");
    setNotes("");
  };

  const handleSubmit = async () => {
    if (!diagnosis && !notes) {
      addToast({
        title: "Campos vacíos",
        description: "Ingresá al menos un diagnóstico o notas",
        color: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, error } = await createConsultation({
        patient_id: patientId,
        doctor_id: doctorId,
        diagnosis: diagnosis || undefined,
        notes: notes || undefined,
      });

      if (success) {
        addToast({
          title: "Consulta registrada",
          description: "La consulta se registró correctamente",
          color: "success",
        });
        resetForm();
        onClose();
      } else {
        addToast({
          title: "Error",
          description: error || "No se pudo registrar la consulta",
          color: "danger",
        });
      }
    } catch {
      addToast({
        title: "Error inesperado",
        description: "Intenta nuevamente",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader>Nueva Consulta</ModalHeader>
            <ModalBody className="gap-4">
              <Input
                label="Diagnóstico"
                placeholder="Ej: Gripe estacional, Hipertensión..."
                value={diagnosis}
                onValueChange={setDiagnosis}
              />
              <Textarea
                label="Notas de la consulta"
                placeholder="Síntomas, observaciones, indicaciones..."
                value={notes}
                onValueChange={setNotes}
                minRows={4}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onModalClose}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              >
                Registrar Consulta
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
