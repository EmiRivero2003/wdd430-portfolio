
"use client";

import { useState } from "react";

interface DeleteProjectButtonProps {
  projectTitle: string;
  deleteAction: () => Promise<void>;
}

export default function DeleteProjectButton({
  projectTitle,
  deleteAction,
}: DeleteProjectButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirmation(true)}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
      >
        Delete
      </button>

      {showConfirmation && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-confirmation-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
            <h2
              id="delete-confirmation-title"
              className="mb-4 text-xl font-bold text-white"
            >
              Delete Project?
            </h2>

            <p className="mb-6 text-slate-300">
              Are you sure you want to delete{" "}
              <strong>{projectTitle}</strong>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="rounded-lg border border-slate-600 px-4 py-2 text-white"
              >
                Cancel
              </button>

              <form action={deleteAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                >
                  Confirm Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
