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
  addToast,
} from "@heroui/react";
import { createPatient } from "@/lib/data-access-layer/patients/patient-actions";

export default function CreatePatientModal({
  isOpen,
  onOpenChange,
  onClose,
  doctorId,
  onPatientCreated,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  doctorId: string;
  onPatientCreated: (patientId: string, fullname: string) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDni("");
    setPhone("");
    setEmail("");
    setBirthDate("");
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !dni) {
      addToast({
        title: "Campos requeridos",
        description: "Nombre, apellido y DNI son obligatorios",
        color: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, error, patient } = await createPatient({
        first_name: firstName,
        last_name: lastName,
        dni,
        phone: phone || undefined,
        email: email || undefined,
        birth_date: birthDate || undefined,
        doctor_id: doctorId,
      });

      if (success && patient) {
        addToast({
          title: "Paciente creado",
          description: `${firstName} ${lastName} fue registrado correctamente`,
          color: "success",
        });
        onPatientCreated(patient.id, `${firstName} ${lastName}`);
        resetForm();
        onClose();
      } else {
        addToast({
          title: "Error",
          description: error || "No se pudo crear el paciente",
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
            <ModalHeader>Nuevo Paciente</ModalHeader>
            <ModalBody className="gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Nombre"
                  placeholder="Juan"
                  value={firstName}
                  onValueChange={setFirstName}
                  isRequired
                />
                <Input
                  label="Apellido"
                  placeholder="Pérez"
                  value={lastName}
                  onValueChange={setLastName}
                  isRequired
                />
              </div>

              <Input
                label="DNI"
                placeholder="12345678"
                value={dni}
                onValueChange={setDni}
                isRequired
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Teléfono"
                  placeholder="+54 11 1234-5678"
                  value={phone}
                  onValueChange={setPhone}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="paciente@email.com"
                  value={email}
                  onValueChange={setEmail}
                />
              </div>

              <Input
                type="date"
                label="Fecha de nacimiento"
                value={birthDate}
                onValueChange={setBirthDate}
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
                Crear Paciente
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
