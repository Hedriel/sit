import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["user"]["Row"];

export type User = Profile & {
  fullname: string;
};

export type Patient = Database["public"]["Tables"]["patient"]["Row"] & {
  fullname: string;
};

export type Consultation = Database["public"]["Tables"]["consultation"]["Row"];

export type Treatment = Database["public"]["Tables"]["treatment"]["Row"];

export type Appointment = Database["public"]["Tables"]["appointment"]["Row"];

export type AppointmentWithPatient = Appointment & {
  patient: {
    first_name: string;
    last_name: string;
    dni: string;
  };
};
