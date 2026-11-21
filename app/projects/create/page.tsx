
import Link from "next/link";
import { notFound } from "next/navigation";
import CreateProjectForm from "./create-project-form";

export default function CreateProjectPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-blue-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        ← Back to Projects
      </Link>

      <h1 className="mb-8 mt-6 text-4xl font-bold text-white">
        Create New Project
      </h1>

      <CreateProjectForm />
    </main>
  );
}
