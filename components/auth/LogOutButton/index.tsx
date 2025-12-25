import { logout } from "@/lib/auth/actions/logout";
import { Button } from "@heroui/button";
import { getSession } from "@/lib/auth/helper";

import { LogOutIcon } from "lucide-react";

export default async function LogOut() {
  const { session: user } = await getSession();
  if (!user) return null;

  return (
    <Button
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600  hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-bold ml-2"
      color="danger"
      onPress={logout}
    >
      <LogOutIcon size={18} />
      Cerrar Sesión
    </Button>
  );
}
