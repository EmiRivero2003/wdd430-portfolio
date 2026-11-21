
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-white">
          Project Not Found
        </h1>

        <p className="mb-8 text-slate-300">
          The project you are looking for does not exist
          or may have been removed.
        </p>

        <Link
          href="/projects"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
