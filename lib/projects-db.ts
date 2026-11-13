
import { neon } from "@neondatabase/serverless";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  return neon(databaseUrl);
}

export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  const sql = getDatabase();

  const rows = type
    ? await sql`
        SELECT * FROM projects
        WHERE type = ${type}
        ORDER BY id
      `
    : await sql`
        SELECT * FROM projects
        ORDER BY id
      `;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    type: row.type,
    technologies: row.technologies ?? [],
    link: row.link ?? undefined,
  }));
}

export async function getProjectById(
  id: number
): Promise<Project | null> {
  const sql = getDatabase();

  const rows = await sql`
    SELECT * FROM projects
    WHERE id = ${id}
  `;

  const row = rows[0];

  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    type: row.type,
    technologies: row.technologies ?? [],
    link: row.link ?? undefined,
  };
}
