"use client";

import { useState, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { useDisclosure } from "@heroui/react";
import type { AppointmentWithPatient, Patient, User } from "@/types";
import AppointmentModal from "./AppointmentModal";
import "./calendar.css";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Turno",
  noEventsInRange: "No hay turnos en este rango",
  showMore: (total: number) => `+${total} más`,
};

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: AppointmentWithPatient;
}

export default function AppointmentCalendar({
  appointments,
  patients,
  doctors,
  currentUser,
}: {
  appointments: AppointmentWithPatient[];
  patients: Patient[];
  doctors: User[];
  currentUser: { id: string; role: string; fullname: string };
}) {
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithPatient | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const events: CalendarEvent[] = useMemo(
    () =>
      appointments.map((apt) => ({
        id: apt.id,
        title: `${apt.title} — ${apt.patient.last_name}, ${apt.patient.first_name}`,
        start: new Date(apt.start_time),
        end: new Date(apt.end_time),
        resource: apt,
      })),
    [appointments],
  );

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setSelectedAppointment(null);
      setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
      onOpen();
    },
    [onOpen],
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      setSelectedAppointment(event.resource);
      setSelectedSlot(null);
      onOpen();
    },
    [onOpen],
  );

  const eventPropGetter = useCallback(
    (event: CalendarEvent) => {
      const status = event.resource.status;
      return {
        className: `event-${status}`,
      };
    },
    [],
  );

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
        messages={messages}
        culture="es"
        step={30}
        timeslots={2}
        min={new Date(0, 0, 0, 7, 0, 0)}
        max={new Date(0, 0, 0, 21, 0, 0)}
        style={{ height: "calc(100vh - 180px)" }}
        formats={{
          dayHeaderFormat: (date: Date) =>
            format(date, "EEEE d 'de' MMMM", { locale: es }),
          dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
            `${format(start, "d MMM", { locale: es })} — ${format(end, "d MMM yyyy", { locale: es })}`,
          agendaDateFormat: (date: Date) =>
            format(date, "EEE d MMM", { locale: es }),
          agendaTimeFormat: (date: Date) =>
            format(date, "HH:mm", { locale: es }),
          timeGutterFormat: (date: Date) =>
            format(date, "HH:mm", { locale: es }),
          eventTimeRangeFormat: ({
            start,
            end,
          }: {
            start: Date;
            end: Date;
          }) =>
            `${format(start, "HH:mm")} — ${format(end, "HH:mm")}`,
        }}
      />

      <AppointmentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        appointment={selectedAppointment}
        slotInfo={selectedSlot}
        patients={patients}
        doctors={doctors}
        currentUser={currentUser}
      />
    </>
  );
}
