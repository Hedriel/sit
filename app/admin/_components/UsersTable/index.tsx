import { getUsers } from "@/lib/data-access-layer/admin/users";
import UsersTableWrapper from "./components/UserTableWrapper";

export default async function UsersTable() {
  const { users } = await getUsers();
  return <UsersTableWrapper users={users} />;
}
