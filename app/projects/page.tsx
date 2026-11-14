
import { Suspense } from "react";
import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

export const dynamic = "force-dynamic";

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  // Validate search parameters
  const query =
    typeof params.query === "string"
      ? params.query.trim().slice(0, 100)
      : "";

  const requestedPage = Number(params.page ?? "1");

  const validPage =
    Number.isSafeInteger(requestedPage) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  // Count matching projects
  const totalPages = await fetchProjectsPages(query);

  // Keep the current page within valid bounds
  const currentPage =
    totalPages > 0
      ? Math.min(validPage, totalPages)
      : 1;

  // Fetch filtered and paginated data
  const projects = await fetchFilteredProjects(
    query,
    currentPage
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
        Projects
      </p>

      <h1 className="mb-6 text-4xl font-bold text-white">
        Projects Overview
      </h1>

      <p className="mb-10 max-w-2xl text-lg leading-8 text-slate-300">
        Explore my open source and school projects,
        where I apply modern development tools to
        build practical and maintainable solutions.
      </p>

      <Suspense fallback={<p>Loading search...</p>}>
        <ProjectSearch />
      </Suspense>

      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-white">
            No projects found
          </h2>

          <p className="text-slate-400">
            Try searching with a different keyword.
          </p>
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </main>
  );
}
