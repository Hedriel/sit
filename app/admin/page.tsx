import BreadCrumb from "@/app/admin/_components/BreadCrumb";
import UsersTable from "@/app/admin/_components/UsersTable";
import { getUsers } from "@/lib/data-access-layer/users";
export default async function AdminPage() {
  const { users } = await getUsers();

  return (
    <div className="px-7">
      <BreadCrumb />
      <UsersTable users={users || []} />
    </div>
  );
}
