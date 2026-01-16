import { getUserProfile } from "@/lib/auth/user";
import NavBarWrapper from "./_components/NavBarWrapper";

export default async function NavBar() {
  const data = await getUserProfile();

  return <NavBarWrapper data={data || null} />;
}
