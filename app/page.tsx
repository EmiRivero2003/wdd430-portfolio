import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "Tournament Manager API",
    description:
      "A REST API for managing football tournaments, teams, players, and matches, with authentication, validation, documentation, and automated tests.",
    technologies: ["Node.js", "Express", "MongoDB", "OAuth", "Swagger", "Jest"],
    link: "https://github.com/EmiRivero2003/CSE341-tournament-manager-api",
  },
  {
    title: "Kings Navaja",
    description:
      "A responsive website created to present a barbershop brand, its services, and its visual identity through an accessible web experience.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "https://github.com/EmiRivero2003/Kings-Navaja",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <section className="max-w-3xl py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Software development portfolio
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Hi, I&apos;m Emiliano Rivero.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          I am a software development student building modern web applications
          and dependable backend systems with clean, maintainable code.
        </p>
      </section>

      <section className="pb-12">
        <h2 className="mb-8 text-3xl font-bold text-white">
          Featured Projects
        </h2>
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}

