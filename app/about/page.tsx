import SkillCard from "@/components/SkillCard";

const skills = [
  {
    title: "Backend Development",
    description:
      "I build organized server-side applications with clear routes, controllers, validation, and error handling.",
    technologies: ["Node.js", "Express", "REST APIs"],
  },
  {
    title: "API Design",
    description:
      "I create documented APIs with reusable resources, secure authentication, and predictable responses.",
    technologies: ["Swagger", "OAuth", "Jest"],
  },
  {
    title: "Databases",
    description:
      "I design and connect applications to relational and document databases for reliable data management.",
    technologies: ["MongoDB", "PostgreSQL", "Mongoose"],
  },
];

export default function About() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          About me
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          Building software with purpose
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          I am a software development student focused on creating dependable,
          understandable applications. I enjoy learning modern technologies and
          turning ideas into practical solutions.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3" aria-label="Technical skills">
        {skills.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </section>
    </main>
  );
}

