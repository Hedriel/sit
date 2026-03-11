"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Tooltip,
  addToast,
  useDisclosure,
} from "@heroui/react";
import { Trash2, UserPlus, Stethoscope } from "lucide-react";
import type { AppointmentWithPatient, Patient, User } from "@/types";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "@/lib/data-access-layer/appointments/appointment-actions";
import CreatePatientModal from "./CreatePatientModal";

function toLocalDateTimeString(date: Date): string {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export default function AppointmentModal({
  isOpen,
  onOpenChange,
  onClose,
  appointment,
  slotInfo,
  patients,
  doctors,
  currentUser,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  appointment: AppointmentWithPatient | null;
  slotInfo: { start: Date; end: Date } | null;
  patients: Patient[];
  doctors: User[];
  currentUser: { id: string; role: string; fullname: string };
}) {
  const isEditing = Boolean(appointment);
  const isReceptionist = currentUser.role === "receptionist";
  const isDoctor = currentUser.role === "doctor";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Local patient list that can be extended when a new patient is created inline
  const [localPatients, setLocalPatients] = useState<Patient[]>(patients);

  // Sync local patients when prop updates
  useEffect(() => {
    setLocalPatients(patients);
  }, [patients]);

  const {
    isOpen: isPatientModalOpen,
    onOpen: onPatientModalOpen,
    onOpenChange: onPatientModalOpenChange,
    onClose: onPatientModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (appointment) {
      setTitle(appointment.title);
      setPatientId(appointment.patient_id);
      setDoctorId(appointment.doctor_id);
      setStartTime(toLocalDateTimeString(new Date(appointment.start_time)));
      setEndTime(toLocalDateTimeString(new Date(appointment.end_time)));
      setNotes(appointment.notes || "");
      setStatus(appointment.status);
    } else if (slotInfo) {
      setTitle("");
      setPatientId("");
      setDoctorId(isReceptionist ? "" : currentUser.id);
      setStartTime(toLocalDateTimeString(slotInfo.start));
      setEndTime(toLocalDateTimeString(slotInfo.end));
      setNotes("");
      setStatus("scheduled");
    }
  }, [appointment, slotInfo, currentUser, isReceptionist]);

  const handlePatientCreated = useCallback(
    (newPatientId: string, fullname: string) => {
      // Add the new patient to the local list and auto-select it
      const [first_name = "", last_name = ""] = fullname.split(" ");
      const newPatient: Patient = {
        id: newPatientId,
        first_name,
        last_name,
        fullname,
        dni: "",
        phone: null,
        email: null,
        birth_date: null,
        doctor_id: doctorId || currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLocalPatients((prev) => [...prev, newPatient]);
      setPatientId(newPatientId);
    },
    [doctorId, currentUser.id],
  );

  const handleSubmit = async () => {
    if (!title || !patientId || !doctorId || !startTime || !endTime) {
      addToast({
        title: "Campos requeridos",
        description: "Completá todos los campos obligatorios",
        color: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && appointment) {
        const { success, error } = await updateAppointment(appointment.id, {
          title,
          patient_id: patientId,
          doctor_id: doctorId,
          start_time: new Date(startTime).toISOString(),
          end_time: new Date(endTime).toISOString(),
          notes: notes || undefined,
          status,
        });

        if (success) {
          addToast({
            title: "Turno actualizado",
            description: "El turno se actualizó correctamente",
            color: "success",
          });
          onClose();
        } else {
          addToast({
            title: "Error",
            description: error || "No se pudo actualizar el turno",
            color: "danger",
          });
        }
      } else {
        const { success, error } = await createAppointment({
          title,
          patient_id: patientId,
          doctor_id: doctorId,
          start_time: new Date(startTime).toISOString(),
          end_time: new Date(endTime).toISOString(),
          notes: notes || undefined,
          created_by: currentUser.id,
        });

        if (success) {
          addToast({
            title: "Turno creado",
            description: "El turno se agendó correctamente",
            color: "success",
          });
          onClose();
        } else {
          addToast({
            title: "Error",
            description: error || "No se pudo crear el turno",
            color: "danger",
          });
        }
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

  const handleDelete = async () => {
    if (!appointment) return;
    setIsDeleting(true);

    try {
      const { success } = await deleteAppointment(appointment.id);
      if (success) {
        addToast({
          title: "Turno eliminado",
          description: "El turno se eliminó correctamente",
          color: "success",
          icon: <Trash2 size={18} />,
        });
        onClose();
      } else {
        addToast({
          title: "Error",
          description: "No se pudo eliminar el turno",
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
      setIsDeleting(false);
    }
  };

  const statusOptions = [
    { key: "scheduled", label: "Agendado", color: "primary" as const },
    { key: "completed", label: "Completado", color: "success" as const },
    { key: "cancelled", label: "Cancelado", color: "default" as const },
  ];

  // Determine the doctor_id to pass to CreatePatientModal
  const activeDoctorId = doctorId || currentUser.id;

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onModalClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                {isEditing ? "Editar Turno" : "Nuevo Turno"}
                {isEditing && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      statusOptions.find((s) => s.key === status)?.color ||
                      "default"
                    }
                  >
                    {statusOptions.find((s) => s.key === status)?.label}
                  </Chip>
                )}
              </ModalHeader>
              <ModalBody className="gap-4">
                <Input
                  label="Motivo de consulta"
                  placeholder="Ej: Control general, Dolor de cabeza..."
                  value={title}
                  onValueChange={setTitle}
                  isRequired
                />

                <div className="flex items-end gap-2">
                  <Select
                    label="Paciente"
                    placeholder="Seleccionar paciente"
                    selectedKeys={patientId ? [patientId] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected) setPatientId(String(selected));
                    }}
                    isRequired
                    className="flex-1"
                  >
                    {localPatients.map((p) => (
                      <SelectItem key={p.id}>
                        {`${p.last_name}, ${p.first_name} — DNI: ${p.dni}`}
                      </SelectItem>
                    ))}
                  </Select>
                  <Tooltip content="Crear nuevo paciente">
                    <Button
                      isIconOnly
                      color="primary"
                      variant="flat"
                      onPress={onPatientModalOpen}
                      className="min-w-10 shrink-0"
                    >
                      <UserPlus size={18} />
                    </Button>
                  </Tooltip>
                </div>

                {isReceptionist ? (
                  <Select
                    label="Médico"
                    placeholder="Seleccionar médico"
                    selectedKeys={doctorId ? [doctorId] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected) setDoctorId(String(selected));
                    }}
                    isRequired
                  >
                    {doctors.map((d) => (
                      <SelectItem key={d.id}>{d.fullname}</SelectItem>
                    ))}
                  </Select>
                ) : (
                  <Input
                    label="Médico"
                    value={currentUser.fullname}
                    isReadOnly
                    isDisabled
                  />
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    type="datetime-local"
                    label="Inicio"
                    value={startTime}
                    onValueChange={setStartTime}
                    isRequired
                  />
                  <Input
                    type="datetime-local"
                    label="Fin"
                    value={endTime}
                    onValueChange={setEndTime}
                    isRequired
                  />
                </div>

                {isEditing && (
                  <Select
                    label="Estado"
                    selectedKeys={[status]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected) setStatus(String(selected));
                    }}
                  >
                    {statusOptions.map((s) => (
                      <SelectItem key={s.key}>{s.label}</SelectItem>
                    ))}
                  </Select>
                )}

                <Textarea
                  label="Notas"
                  placeholder="Notas adicionales..."
                  value={notes}
                  onValueChange={setNotes}
                  minRows={2}
                />
              </ModalBody>
              <ModalFooter>
                {isEditing && isDoctor && appointment?.status === "scheduled" && (
                  <Button
                    color="secondary"
                    variant="flat"
                    startContent={<Stethoscope size={16} />}
                    onPress={() => {
                      onClose();
                      router.push(`/patients/${appointment.patient_id}`);
                    }}
                    className="mr-auto"
                  >
                    Empezar Consulta
                  </Button>
                )}
                {isEditing && (
                  <Button
                    color="danger"
                    variant="light"
                    onPress={handleDelete}
                    isLoading={isDeleting}
                    startContent={
                      !isDeleting ? <Trash2 size={16} /> : undefined
                    }
                  >
                    Eliminar
                  </Button>
                )}
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
                  {isEditing ? "Guardar" : "Agendar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <CreatePatientModal
        isOpen={isPatientModalOpen}
        onOpenChange={onPatientModalOpenChange}
        onClose={onPatientModalClose}
        doctorId={activeDoctorId}
        onPatientCreated={handlePatientCreated}
      />
    </>
  );
}
