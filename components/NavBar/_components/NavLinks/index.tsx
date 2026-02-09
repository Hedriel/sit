"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
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
        .filter((link) => link.href !== "/admin" || role === "admin")
        .map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen?.(false)}
            className={`transition-all duration-300 hover:sm:scale-105 ${link.href === pathname
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
