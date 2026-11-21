
import Link from "next/link";
import { deleteProject } from "@/app/lib/actions";
import DeleteProjectButton from "./DeleteProjectButton";

interface ProjectActionsProps {
  id: number;
  title: string;
}

export default function ProjectActions({
  id,
  title,
}: ProjectActionsProps) {
  // Hide management buttons in production
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // Bind project ID to the delete Server Action
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <>
      <Link
        href={`/projects/${id}/edit`}
        className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
      >
        Edit
      </Link>

      <DeleteProjectButton
        projectTitle={title}
        deleteAction={deleteProjectWithId}
      />
    </>
  );
}
