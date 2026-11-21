
"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("An unexpected error occurred:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-red-900/50 bg-slate-900 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-white">
          Something Went Wrong!
        </h1>

        <p className="mb-8 text-slate-300">
          An unexpected error occurred while processing
          your request. Please try again later.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Try Again
          </button>

          <Link
            href="/projects"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
