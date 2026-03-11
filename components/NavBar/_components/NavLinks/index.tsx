"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Turnos", roles: ["doctor", "receptionist"] },
  { href: "/admin", label: "Admin", roles: ["admin"] },
  { href: "/patients", label: "Pacientes", roles: ["doctor"] },
];

export default function NavLinks({
  setIsMenuOpen,
  role,
}: {
  setIsMenuOpen?: (value: boolean) => void;
  role: string;
}) {
  const pathname = usePathname();
  return (
    <>
      {links
        .filter(
          (link) => link.roles.length === 0 || link.roles.includes(role),
        )
        .map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen?.(false)}
            className={`transition-all duration-300 hover:sm:scale-105 ${
              link.href === pathname
                ? "text-primary"
                : "hover:text-primary opacity-85"
            }`}
          >
            {link.label}
          </Link>
        ))}
    </>
  );
}
