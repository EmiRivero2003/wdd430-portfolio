import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="border-b border-blue-900/60 bg-slate-950 text-white">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5"
        aria-label="Main navigation"
      >
        <Link
          id="header-title"
          href="/"
          className="text-xl font-bold tracking-tight transition-colors hover:text-blue-400"
        >
          Emiliano Rivero
        </Link>

        <NavLinks />
      </nav>
    </header>
  );
}