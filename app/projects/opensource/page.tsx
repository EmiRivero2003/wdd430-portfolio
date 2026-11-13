
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export default async function OpenSourceProjectsPage() {
  const projects = await getProjects("opensource");

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
        Projects
      </p>

      <h1 className="mb-6 text-4xl font-bold text-white">
        Open Source Projects
      </h1>

      <p className="max-w-2xl text-lg leading-8 text-slate-300">
        These projects are publicly available for collaboration, learning,
        and continued improvement.
      </p>

      <ProjectList projects={projects} />
    </main>
  );
}
