import UserPlate from "@/components/admin/user-plate";
// import UserForm from "@/components/admin/UserForm";
import { getUsers } from "@/lib/data-access-layer/user";
export default async function AdminPage() {
  const { users } = await getUsers();
  return (
    <div>
      <UserPlate users={users || []} />
      {/* TODO: Listado de usuarios con ABM
      <UserList />
      */}
      {/* TODO: El formulario debe ser un Modal que se abre al hacer click en el boton de agregar 
      <UserForm />
      */}
    </div>
  );
}
