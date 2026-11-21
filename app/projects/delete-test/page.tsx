
import { notFound } from "next/navigation";
import { deleteProject } from "@/app/lib/actions";

export default function DeleteTestPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const deleteTestProject = deleteProject.bind(null, 8);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Delete Test Project
      </h1>

      <p className="mb-6 text-slate-300">
        This will permanently delete project ID 8.
      </p>

      <form action={deleteTestProject}>
        <button
          type="submit"
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Delete Test Project
        </button>
      </form>
    </main>
  );
}
