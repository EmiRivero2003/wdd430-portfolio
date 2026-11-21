
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createProject, type State } from "@/app/lib/actions";

const initialState: State = {
  message: null,
  errors: {},
};

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50";

function FieldErrors({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  if (!errors?.length) {
    return <div id={id} aria-live="polite" aria-atomic="true" />;
  }

  return (
    <div
      id={id}
      aria-live="polite"
      aria-atomic="true"
      className="mt-2"
    >
      {errors.map((error, index) => (
        <p key={`${error}-${index}`} className="text-sm text-red-400">
          {error}
        </p>
      ))}
    </div>
  );
}

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState
  );

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-white">
          Project Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          minLength={3}
          required
          aria-required="true"
          aria-invalid={Boolean(state.errors?.title?.length)}
          aria-describedby="title-error"
          className={inputClass}
        />
        <FieldErrors id="title-error" errors={state.errors?.title} />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-white">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          minLength={20}
          required
          aria-required="true"
          aria-invalid={Boolean(state.errors?.description?.length)}
          aria-describedby="description-error"
          className={inputClass}
        />
        <FieldErrors
          id="description-error"
          errors={state.errors?.description}
        />
      </div>

      <div>
        <label htmlFor="technologies" className="mb-2 block text-white">
          Technologies
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          placeholder="React, Next.js, PostgreSQL"
          required
          aria-required="true"
          aria-invalid={Boolean(state.errors?.technologies?.length)}
          aria-describedby="technologies-help technologies-error"
          className={inputClass}
        />
        <p id="technologies-help" className="mt-1 text-sm text-slate-400">
          Separate technologies with commas.
        </p>
        <FieldErrors
          id="technologies-error"
          errors={state.errors?.technologies}
        />
      </div>

      <div>
        <label htmlFor="yearCompleted" className="mb-2 block text-white">
          Year Completed
        </label>
        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min={2000}
          max={new Date().getFullYear()}
          step={1}
          placeholder="2026"
          required
          aria-required="true"
          aria-invalid={Boolean(state.errors?.yearCompleted?.length)}
          aria-describedby="yearCompleted-error"
          className={inputClass}
        />
        <FieldErrors
          id="yearCompleted-error"
          errors={state.errors?.yearCompleted}
        />
      </div>

      <div>
        <label htmlFor="type" className="mb-2 block text-white">
          Project Type
        </label>
        <select
          id="type"
          name="type"
          required
          aria-required="true"
          aria-invalid={Boolean(state.errors?.type?.length)}
          aria-describedby="type-error"
          className={inputClass}
        >
          <option value="school">School Project</option>
          <option value="opensource">Open Source</option>
        </select>
        <FieldErrors id="type-error" errors={state.errors?.type} />
      </div>

      <div>
        <label htmlFor="link" className="mb-2 block text-white">
          Project URL (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          placeholder="https://github.com/..."
          aria-invalid={Boolean(state.errors?.link?.length)}
          aria-describedby="link-error"
          className={inputClass}
        />
        <FieldErrors id="link-error" errors={state.errors?.link} />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <p role="status" className="text-sm text-red-400">
            {state.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Project"}
        </button>

        <Link
          href="/projects"
          className="rounded-lg border border-slate-700 px-6 py-3 text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
