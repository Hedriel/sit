import { ThemeSwitcher } from "@/providers/UIProvider/ThemeSwitcher";

import LogOut from "@/components/auth/LogOutButton";
import UserCard from "@/components/global/UserCard";

import { getUserById } from "@/lib/data-access-layer/users";
import { getSession } from "@/lib/auth/helper";

export default async function NavBar() {
  const { session } = await getSession();
  const { user } = await getUserById(session?.sub!);

  return (
    <nav className="flex justify-between items-center relative">
      <h1 className="text-2xl font-bold">Sistema Integral de Turnos</h1>
      <div className="flex gap-4">
        <ThemeSwitcher />
        <UserCard
          name={user?.first_name}
          email={session?.email!}
          avatar={user?.avatar}
        />
        <LogOut />
      </div>
    </nav>
  );
}
