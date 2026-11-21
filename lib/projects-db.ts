
import { neon } from "@neondatabase/serverless";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export const ITEMS_PER_PAGE = 6;

// Connect to Neon PostgreSQL
export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  return neon(databaseUrl);
}

// Get all projects or filter by type
export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  const sql = getDatabase();

  const rows = type
    ? await sql`
        SELECT *
        FROM projects
        WHERE type = ${type}
        ORDER BY id
      `
    : await sql`
        SELECT *
        FROM projects
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

// Get a single project by ID
export async function getProjectById(
  id: number
): Promise<Project | null> {
  const sql = getDatabase();

  const rows = await sql`
    SELECT *
    FROM projects
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

// Search projects with pagination
export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const sql = getDatabase();

  const safeQuery = query.trim().slice(0, 100);
  const searchTerm = `%${safeQuery.replace(/[\\%_]/g, "\\$&")}%`;

  const safePage =
    Number.isSafeInteger(currentPage) && currentPage > 0
      ? currentPage
      : 1;

  const offset = Math.min(
    (safePage - 1) * ITEMS_PER_PAGE,
    2147483647
  );

  const rows = await sql`
    SELECT *
    FROM projects
    WHERE
      title ILIKE ${searchTerm} ESCAPE '\'
      OR description ILIKE ${searchTerm} ESCAPE '\'
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS tech
        WHERE tech ILIKE ${searchTerm} ESCAPE '\'
      )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
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

// Count total pages for the search results
export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const sql = getDatabase();

  const safeQuery = query.trim().slice(0, 100);
  const searchTerm = `%${safeQuery.replace(/[\\%_]/g, "\\$&")}%`;

  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE
      title ILIKE ${searchTerm} ESCAPE '\'
      OR description ILIKE ${searchTerm} ESCAPE '\'
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS tech
        WHERE tech ILIKE ${searchTerm} ESCAPE '\'
      )
  `;

  const totalProjects = Number(rows[0].count);

  return Math.ceil(totalProjects / ITEMS_PER_PAGE);
}
