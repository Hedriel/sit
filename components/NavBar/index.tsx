import { getUserProfile } from "@/lib/auth/user";
import NavBarWrapper from "./_components/NavBarWrapper";
import { redirectToLogin } from "@/lib/utils";

export default async function NavBar() {
  const data = await getUserProfile();

  if (!data) {
    redirectToLogin();
    return;
  }

  return <NavBarWrapper data={data} />;
}
