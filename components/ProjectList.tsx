
import ProjectCard from "./ProjectCard";

interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  type?: "opensource" | "school";
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({
  projects,
}: ProjectListProps) {
  return (
    <section
      className="grid gap-6 md:grid-cols-2"
      aria-label="Featured projects"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id ?? `${project.title}-${index}`}
          id={project.id}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          link={project.link}
        />
      ))}
    </section>
  );
}

