
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDatabase } from "@/lib/projects-db";

// Validation rules shared by project forms
const ProjectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters."),

  technologies: z
    .string()
    .trim()
    .min(2, "Add at least one technology.")
    .refine(
      (value) =>
        value.split(",").some((tech) => tech.trim().length > 0),
      "Add at least one valid technology."
    ),

  type: z.enum(["opensource", "school"]),

  link: z.union([
    z.literal(""),
    z.url("Enter a valid project URL."),
  ]),
});

// Create form includes year validation
const CreateProjectSchema = ProjectFormSchema.extend({
  yearCompleted: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter a valid four-digit year.")
    .transform(Number)
    .pipe(
      z
        .number()
        .int()
        .min(2000, "Year must be 2000 or later.")
        .max(
          new Date().getFullYear(),
          "Year cannot be in the future."
        )
    ),
});

// State returned to useActionState
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    type?: string[];
    link?: string[];
    yearCompleted?: string[];
  };
  message: string | null;
};

// Restrict mutations to development
function checkDevelopmentAccess() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Project management is disabled.");
  }
}

// Refresh project pages after mutations
function refreshProjectPages() {
  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
}

// CREATE PROJECT WITH useActionState
export async function createProject(
  prevState: State,
  formData: FormData
): Promise<State> {
  checkDevelopmentAccess();

  const validatedFields = CreateProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
    link: formData.get("link") ?? "",
    yearCompleted: formData.get("yearCompleted"),
  });

  // Return field-level validation errors
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message:
        "Missing or invalid fields. Please check your information.",
    };
  }

  const {
    title,
    description,
    technologies,
    type,
    link,
    yearCompleted,
  } = validatedFields.data;

  try {
    const sql = getDatabase();

    await sql`
      INSERT INTO projects (
        title,
        description,
        technologies,
        type,
        link,
        year_completed
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
        ${link || null},
        ${yearCompleted}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      errors: {},
      message:
        "Database Error: Failed to create project. Please try again.",
    };
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

  const {
    title,
    description,
    technologies,
    type,
    link,
  } = parsed.data;

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
      throw new Error(
        "The requested project no longer exists."
      );
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
      throw new Error(
        "The requested project no longer exists."
      );
    }

    throw new Error(
      "Failed to delete project. Please try again later."
    );
  }

  refreshProjectPages();
  
  redirect("/projects");
}
