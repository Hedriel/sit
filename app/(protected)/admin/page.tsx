import { getUserProfile } from "@/lib/auth/user";
import { getUsers } from "@/lib/data-access-layer/admin/users";
import { redirect } from "next/navigation";
import BreadCrumb from "./_components/BreadCrumb";
import UsersTable from "./_components/UsersTable";
export default async function AdminPage() {
  const user = await getUserProfile();
  if (user?.role !== "admin") {
    redirect("/");
  }
  const { users } = await getUsers();

  return (
    <div className="px-7">
      <BreadCrumb />
      <UsersTable users={users || []} />
    </div>
  );
}
