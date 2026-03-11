import { getUserProfile } from "@/lib/auth/user";
import { redirect } from "next/navigation";
import PatientsTable from "./PatientsTable";

export default async function PatientsContent() {
  const user = await getUserProfile();

  if (!user || user.role !== "doctor") {
    redirect("/");
  }

  return <PatientsTable doctorId={user.id} />;
}
