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
import { createTreatment } from "@/lib/data-access-layer/patients/consultation-actions";

export default function CreateTreatmentModal({
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
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setMedication("");
    setDosage("");
    setFrequency("");
    setEndDate("");
    setNotes("");
  };

  const handleSubmit = async () => {
    if (!medication || !dosage || !frequency) {
      addToast({
        title: "Campos requeridos",
        description: "Medicamento, dosis y frecuencia son obligatorios",
        color: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, error } = await createTreatment({
        patient_id: patientId,
        doctor_id: doctorId,
        medication,
        dosage,
        frequency,
        end_date: endDate || undefined,
        notes: notes || undefined,
      });

      if (success) {
        addToast({
          title: "Tratamiento creado",
          description: `${medication} fue asignado correctamente`,
          color: "success",
        });
        resetForm();
        onClose();
      } else {
        addToast({
          title: "Error",
          description: error || "No se pudo crear el tratamiento",
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
            <ModalHeader>Nuevo Tratamiento</ModalHeader>
            <ModalBody className="gap-4">
              <Input
                label="Medicamento"
                placeholder="Ej: Ibuprofeno, Amoxicilina..."
                value={medication}
                onValueChange={setMedication}
                isRequired
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Dosis"
                  placeholder="Ej: 400mg, 2 comprimidos..."
                  value={dosage}
                  onValueChange={setDosage}
                  isRequired
                />
                <Input
                  label="Frecuencia"
                  placeholder="Ej: Cada 8 horas, 2 veces al día..."
                  value={frequency}
                  onValueChange={setFrequency}
                  isRequired
                />
              </div>

              <Input
                type="date"
                label="Fecha de finalización (opcional)"
                value={endDate}
                onValueChange={setEndDate}
              />

              <Textarea
                label="Notas"
                placeholder="Indicaciones especiales..."
                value={notes}
                onValueChange={setNotes}
                minRows={2}
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
                Recetar Tratamiento
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
