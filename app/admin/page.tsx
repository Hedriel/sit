import { getUserProfile } from "@/lib/auth/user";
import { getUsers } from "@/lib/data-access-layer/admin/users";
import UsersTable from "./_components/UsersTable";

import BreadCrumb from "./_components/BreadCrumb";

import { redirectToHome } from "@/lib/utils";
export default async function AdminPage() {
  const user = await getUserProfile();
  if (user?.role !== "admin") {
    redirectToHome();
  }
  const { users } = await getUsers();

  return (
    <div className="px-7">
      <BreadCrumb />

      <UsersTable users={users || []} />
    </div>
  );
}
