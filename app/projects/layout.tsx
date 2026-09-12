import Link from "next/link";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      <nav className="border-b border-blue-900 bg-slate-950">
        <div className="mx-auto flex w-full max-w-5xl gap-6 px-6 py-4">
          <Link
            href="/projects"
            className="text-sm font-medium text-slate-300 hover:text-blue-400"
          >
            Overview
          </Link>

          <Link
            href="/projects/opensource"
            className="text-sm font-medium text-slate-300 hover:text-blue-400"
          >
            Open Source
          </Link>

          <Link
            href="/projects/school"
            className="text-sm font-medium text-slate-300 hover:text-blue-400"
          >
            School
          </Link>
        </div>
      </nav>

      {children}
    </section>
  );
}