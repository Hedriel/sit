import UserPlate from "@/components/admin/user-plate";
import UserForm from "@/components/admin/UserForm";
import { getUsers } from "@/lib/data-access-layer/user";
export default async function AdminPage() {
  const { users } = await getUsers();
  return (
    <div className="grid grid-cols-5 ">
      <UserPlate users={users || []} />
      <UserForm />
    </div>
  );
}
