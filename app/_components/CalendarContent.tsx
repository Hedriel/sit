import { getUserProfile } from "@/lib/auth/user";
import { redirect } from "next/navigation";
import { getAppointments } from "@/lib/data-access-layer/appointments/appointments";
import {
  getDoctors,
  getAllPatients,
} from "@/lib/data-access-layer/appointments/doctors";
import AppointmentCalendar from "./AppointmentCalendar";
import type { AppointmentWithPatient } from "@/types";

export default async function CalendarContent() {
  const user = await getUserProfile();

  if (!user || (user.role !== "doctor" && user.role !== "receptionist")) {
    redirect("/sign-in");
  }

  const isDoctor = user.role === "doctor";

  const [{ appointments }, { doctors }, { patients }] = await Promise.all([
    getAppointments(isDoctor ? user.id : undefined),
    getDoctors(),
    getAllPatients(),
  ]);

  const fullname =
    `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.name;

  return (
    <AppointmentCalendar
      appointments={appointments as AppointmentWithPatient[]}
      patients={patients}
      doctors={doctors}
      currentUser={{
        id: user.id,
        role: user.role,
        fullname,
      }}
    />
  );
}
