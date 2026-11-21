
import Link from "next/link";
import { notFound } from "next/navigation";
import { createProject } from "@/app/lib/actions";

export default function CreateProjectPage() {
  // Disable the create page in production
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to Projects
      </Link>

      <h1 className="mt-6 mb-8 text-4xl font-bold text-white">
        Create New Project
      </h1>

      <form action={createProject} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-white"
          >
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            minLength={2}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            minLength={10}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </div>

        <div>
          <label
            htmlFor="technologies"
            className="mb-2 block text-white"
          >
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            placeholder="React, Next.js, PostgreSQL"
            minLength={2}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
          <p className="mt-1 text-sm text-slate-400">
            Separate technologies with commas.
          </p>
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-white"
          >
            Project Type
          </label>
          <select
            id="type"
            name="type"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option value="school">
              School Project
            </option>
            <option value="opensource">
              Open Source
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="link"
            className="mb-2 block text-white"
          >
            Project URL (optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            placeholder="https://github.com/..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save Project
          </button>

          <Link
            href="/projects"
            className="rounded-lg border border-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
