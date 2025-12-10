import UserPlate from "@/components/admin/user-plate";
import UserForm from "@/components/admin/UserForm";
import { getUserProfile } from "@/lib/data-access-layer/user";
export default async function AdminPage() {
  const { users } = await getUserProfile();
  return (
    <div className="grid grid-cols-5 ">
      <UserPlate users={users || []} />
      <UserForm />
    </div>
  );
}
