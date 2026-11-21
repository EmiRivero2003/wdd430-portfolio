
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDatabase } from "@/lib/projects-db";

// Project validation schema
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

// Restrict mutations to local development
function checkDevelopmentAccess() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Project management is disabled.");
  }
}

// Revalidate project routes
function refreshProjectPages() {
  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
}

// Validate project form data
function validateProject(formData: FormData) {
  const parsed = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    link: formData.get("link") ?? "",
  });

  if (!parsed.success) {
    throw new Error(
      "Invalid project information. Please check all fields."
    );
  }

  const technologiesArray = parsed.data.technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  if (technologiesArray.length === 0) {
    throw new Error("At least one technology is required.");
  }

  return parsed.data;
}

// CREATE PROJECT
export async function createProject(formData: FormData) {
  checkDevelopmentAccess();

  const { title, description, technologies, type, link } =
    validateProject(formData);

  try {
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
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error(
      "Failed to create project. Please try again later."
    );
  }

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

  const { title, description, technologies, type, link } =
    validateProject(formData);

  try {
    const sql = getDatabase();

    const result = await sql`
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
      RETURNING id
    `;

    if (result.length === 0) {
      throw new Error("PROJECT_NOT_FOUND");
    }
  } catch (error) {
    console.error("Error updating project:", error);

    if (
      error instanceof Error &&
      error.message === "PROJECT_NOT_FOUND"
    ) {
      throw new Error("The requested project no longer exists.");
    }

    throw new Error(
      "Failed to update project. Please try again later."
    );
  }

  refreshProjectPages();
  redirect("/projects");
}

// DELETE PROJECT
export async function deleteProject(id: number) {
  checkDevelopmentAccess();

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  try {
    const sql = getDatabase();

    const result = await sql`
      DELETE FROM projects
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      throw new Error("PROJECT_NOT_FOUND");
    }
  } catch (error) {
    console.error("Error deleting project:", error);

    if (
      error instanceof Error &&
      error.message === "PROJECT_NOT_FOUND"
    ) {
      throw new Error("The requested project no longer exists.");
    }

    throw new Error(
      "Failed to delete project. Please try again later."
    );
  }

  refreshProjectPages();
  
  redirect("/projects");
}
