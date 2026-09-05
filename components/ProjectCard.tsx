interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-blue-900/70 bg-slate-900 p-6 shadow-lg shadow-blue-950/20">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 flex-1 leading-7 text-slate-300">{description}</p>
      <p className="mt-5 text-sm text-slate-400">
        <strong className="text-blue-300">Technologies:</strong>{" "}
        {technologies.join(", ")}
      </p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          View Project
        </a>
      )}
    </article>
  );
}

