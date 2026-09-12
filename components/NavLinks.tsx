"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-6 text-sm font-medium">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "border-b-2 border-blue-400 pb-1 text-blue-400"
                  : "transition-colors hover:text-blue-400"
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}