
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page"));
  const currentPage =
    Number.isSafeInteger(pageParam) && pageParam > 0
      ? pageParam
      : 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Project pagination"
      className="mt-10 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:border-blue-500 hover:bg-slate-800"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-800 px-4 py-2 text-slate-600">
          Previous
        </span>
      )}

      <span className="text-sm text-slate-300">
        Page {Math.min(currentPage, totalPages)} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:border-blue-500 hover:bg-slate-800"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-800 px-4 py-2 text-slate-600">
          Next
        </span>
      )}
    </nav>
  );
}
