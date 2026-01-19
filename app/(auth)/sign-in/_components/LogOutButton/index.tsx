import { logout } from "@/lib/auth/actions/logout";
import { Button } from "@heroui/button";

import { LogOutIcon } from "lucide-react";

export default function LogOut() {
  return (
    <Button
      className="flex w-full items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
      color="danger"
      onPress={logout}
    >
      <LogOutIcon size={18} />
      Cerrar Sesión
    </Button>
  );
}
