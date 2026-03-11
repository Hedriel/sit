"use server";
import { cacheTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";
import { User } from "@/types";

export async function getDoctors() {
  "use cache";
  cacheTag("doctors");
  const supabase = createClient();

  const { data: profiles } = await supabase
    .from("user")
    .select("*")
    .eq("role", "doctor")
    .eq("banned", false);

  const doctors: User[] = (profiles || []).map((profile) => ({
    ...profile,
    fullname: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
  }));

  return { doctors };
}

export async function getAllPatients() {
  "use cache";
  cacheTag("all-patients");
  const supabase = createClient();

  const { data: patients } = await supabase
    .from("patient")
    .select("*")
    .order("last_name", { ascending: true });

  return {
    patients: (patients || []).map((p) => ({
      ...p,
      fullname: `${p.first_name} ${p.last_name}`.trim(),
    })),
  };
}
