interface SkillCardProps {
  title: string;
  description: string;
  technologies: string[];
}

export default function SkillCard({
  title,
  description,
  technologies,
}: SkillCardProps) {
  return (
    <article className="rounded-2xl border border-blue-900/70 bg-slate-900 p-6">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full bg-blue-950 px-3 py-1 text-sm text-blue-200"
          >
            {technology}
          </li>
        ))}
      </ul>
    </article>
  );
}

