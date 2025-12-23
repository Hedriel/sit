import { logout } from "@/lib/auth/actions/logout";
import { Button } from "@heroui/button";
import { getSession } from "@/lib/auth/helper";

export default async function LogOut() {
  const { session: user } = await getSession();
  if (!user) return null;

  return (
    <Button color="danger" onPress={logout}>
      Cerrar Sesión
    </Button>
  );
}
