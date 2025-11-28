import { Button } from "@heroui/button";
import { isLoggedIn, loginOut } from "../auth";
export default async function LogOut() {
  if (!(await isLoggedIn())) return null;
  return (
    <Button color="danger" onPress={loginOut}>
      Cerrar Sesión
    </Button>
  );
}
