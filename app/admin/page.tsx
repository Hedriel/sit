import BreadCrumb from "@/app/admin/_components/BreadCrumb";
import UserPlate from "@/app/admin/_components/UserList";
import UsersTable from "@/app/admin/_components/UsersTable";
// import UserForm from "@/components/admin/UserForm";
import { getUsers } from "@/lib/data-access-layer/users";
export default async function AdminPage() {
  const { users } = await getUsers();

  return (
    <div className="px-7">
      <BreadCrumb />
      {/* <UserPlate users={users || []} /> */}
      <UsersTable users={users || []} />
      {/* TODO: Listado de usuarios con ABM
      <UserList />
      */}
      {/* TODO: El formulario debe ser un Modal que se abre al hacer click en el boton de agregar 
      <UserForm />
      */}
    </div>
  );
}
