import { logout } from "@/lib/auth/actions/logout";
import { Button } from "@heroui/button";
import { getUser } from "@/lib/auth/helper";

export default async function LogOut() {
  const { user } = await getUser();
  if (!user) return null;

  return (
    <Button color="danger" onPress={logout}>
      Cerrar Sesión
    </Button>
  );
}
