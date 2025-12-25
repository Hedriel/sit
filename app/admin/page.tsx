import BreadCrumb from "@/components/admin/BreadCrumb";
import UserPlate from "@/components/admin/UserList";
import UsersTable from "@/components/admin/UsersTable";
// import UserForm from "@/components/admin/UserForm";
import { getUsers } from "@/lib/data-access-layer/users";
export default async function AdminPage() {
  const { users } = await getUsers();
  return (
    <div>
      <BreadCrumb />
      {/* <UserPlate users={users || []} /> */}
      <UsersTable />
      {/* TODO: Listado de usuarios con ABM
      <UserList />
      */}
      {/* TODO: El formulario debe ser un Modal que se abre al hacer click en el boton de agregar 
      <UserForm />
      */}
    </div>
  );
}
