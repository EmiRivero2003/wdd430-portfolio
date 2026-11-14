
"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentQuery = searchParams.get("query") ?? "";

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      params.set("page", "1");

      if (term.trim()) {
        params.set("query", term.trim());
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="mb-8">
      <label
        htmlFor="project-search"
        className="mb-3 block text-sm font-medium text-slate-300"
      >
        Search Projects
      </label>

      <div className="relative">
        <input
          key={currentQuery}
          id="project-search"
          type="search"
          placeholder="Search by title, description, or technology..."
          defaultValue={currentQuery}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>
  );
}
