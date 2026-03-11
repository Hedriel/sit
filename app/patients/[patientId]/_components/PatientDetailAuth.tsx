import { getUserProfile } from "@/lib/auth/user";
import { redirect } from "next/navigation";
import PatientDetailContent from "./PatientDetailContent";

export default async function PatientDetailAuth({
  patientId,
}: {
  patientId: string;
}) {
  const user = await getUserProfile();

  if (!user || user.role !== "doctor") {
    redirect("/");
  }

  return <PatientDetailContent patientId={patientId} />;
}
