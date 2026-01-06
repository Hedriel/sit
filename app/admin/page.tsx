import BreadCrumb from "@/app/admin/_components/BreadCrumb";
import UsersTable from "@/app/admin/_components/UsersTable";
import { getUserProfile } from "@/lib/auth/user";
import { getUsers } from "@/lib/data-access-layer/admin/users";
import { redirect } from "next/navigation";
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
