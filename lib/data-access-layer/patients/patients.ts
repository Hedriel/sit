"use server";
import { cacheTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";
import { Patient } from "@/types";

export async function getPatientsByDoctor(doctorId: string) {
  "use cache";
  cacheTag("patients");
  const supabase = createClient();

  const { data: patients } = await supabase
    .from("patient")
    .select("*")
    .eq("doctor_id", doctorId)
    .order("last_name", { ascending: true });

  const result: Patient[] = (patients || []).map((p) => ({
    ...p,
    fullname: `${p.first_name} ${p.last_name}`.trim(),
  }));

  return { patients: result };
}

export async function getPatientById(patientId: string) {
  "use cache";
  cacheTag(`patient-${patientId}`);
  const supabase = createClient();

  const { data: patient } = await supabase
    .from("patient")
    .select("*")
    .eq("id", patientId)
    .single();

  if (!patient) {
    return { patient: null };
  }

  const result: Patient = {
    ...patient,
    fullname: `${patient.first_name} ${patient.last_name}`.trim(),
  };

  return { patient: result };
}
