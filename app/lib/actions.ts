
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDatabase } from "@/lib/projects-db";

// Project form validation schema
const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title is too short"),
  description: z
    .string()
    .trim()
    .min(10, "Description is too short"),
  technologies: z
    .string()
    .trim()
    .min(2, "Technologies are required"),
  type: z.enum(["opensource", "school"]),
  link: z.union([z.literal(""), z.url()]),
});

// Allow mutations only in local development
function checkDevelopmentAccess() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Project management is disabled.");
  }
}

// Refresh all project pages after a mutation
function refreshProjectPages() {
  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
}

// CREATE PROJECT
export async function createProject(formData: FormData) {
  checkDevelopmentAccess();

  const parsed = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    link: formData.get("link") ?? "",
  });

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const {
    title,
    description,
    technologies,
    type,
    link,
  } = parsed.data;

  const sql = getDatabase();

  await sql`
    INSERT INTO projects (
      title,
      description,
      technologies,
      type,
      link
    )
    VALUES (
      ${title},
      ${description},
      ARRAY(
        SELECT btrim(value)
        FROM unnest(
          string_to_array(${technologies}, ',')
        ) AS value
        WHERE btrim(value) <> ''
      ),
      ${type},
      ${link || null}
    )
  `;

  refreshProjectPages();

  redirect("/projects");
}

// UPDATE PROJECT
export async function updateProject(
  id: number,
  formData: FormData
) {
  checkDevelopmentAccess();

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  const parsed = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    link: formData.get("link") ?? "",
  });

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const {
    title,
    description,
    technologies,
    type,
    link,
  } = parsed.data;

  const sql = getDatabase();

  await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      technologies = ARRAY(
        SELECT btrim(value)
        FROM unnest(
          string_to_array(${technologies}, ',')
        ) AS value
        WHERE btrim(value) <> ''
      ),
      type = ${type},
      link = ${link || null}
    WHERE id = ${id}
  `;

  refreshProjectPages();

  redirect("/projects");
}

// DELETE PROJECT

export async function deleteProject(id: number) {
  checkDevelopmentAccess();

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  const sql = getDatabase();

  await sql`
    DELETE FROM projects
    WHERE id = ${id}
  `;

  refreshProjectPages();

  redirect("/projects");
}
