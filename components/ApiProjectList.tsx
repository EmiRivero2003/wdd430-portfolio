"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects-db";

interface ApiProjectListProps {
  endpoint: string;
}

export default function ApiProjectList({
  endpoint,
}: ApiProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch {
        setError("Could not load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [endpoint]);

  if (loading) {
    return <p className="mt-6">Loading projects...</p>;
  }

  if (error) {
    return <p className="mt-6 text-red-400">{error}</p>;
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-2xl border border-blue-900 bg-slate-900 p-6"
        >
          <h2 className="text-xl font-bold">{project.title}</h2>

          <p className="mt-3 text-slate-300">
            {project.description}
          </p>

          <p className="mt-4 text-sm text-blue-300">
            {project.technologies.join(" • ")}
          </p>
        </article>
      ))}
    </div>
  );
}