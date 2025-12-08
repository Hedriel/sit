import { logout } from "@/lib/auth/actions/logout";
import { Button } from "@heroui/button";
import { checkAuth } from "@/lib/auth/check-session";

export default async function LogOut() {
  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) return null;

  return (
    <Button color="danger" onPress={logout}>
      Cerrar Sesión
    </Button>
  );
}
